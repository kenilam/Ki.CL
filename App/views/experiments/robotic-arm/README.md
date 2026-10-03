# Robotic arm

A simulated factory floor at `/experiments/robotic-arm`. The floor is the plant: arms, belts, pallets, cases, workers and delivery robots. Each arm behaves like a physical robot plugged into our services. It publishes what its sensors read and moves only on the commands it receives. Its brain is either the classic controller or physical AI, and swapping one for the other must not drop a case or jump a joint.

This file records the decisions behind it. Read it before working on the floor, its brains or the bridge in Ki.CL-arm.

## How a real arm talks to its brain

- Perception: cameras and tactile sensors on the arm or in the cell read the world and feed an edge computer.
- Reasoning: the computer works out what it sees, plans a collision-free path and decides the next move within milliseconds.
- Action: it sends low-latency commands over a bus (EtherCAT, daisy-chained smart servos) to the arm's motors.

The floor copies this split. Sensor frames go out and commands come back, at a fixed bus tick.

## Decisions

| Topic                            | Decision                                                                                                                                                                                                                                                                                                                                                  |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Where the world lives            | Here, in `floor/`: the plant (`floor/world`), its meshes, the panel and the loop. The view is its own workspace (`app.views.experiments.robotic-arm`).                                                                                                                                                                                                    |
| Where the robots and brains live | Ki.CL-arm owns everything about the robots and their brains, classic and physical AI alike. It is federated as the `arm` remote: `arm/robot` (geometry), `arm/grid` (the hex grid), `arm/frames` (sensor and command types) and `arm/brains` (the router the floor calls, with the classic brains in workers, the link, the codec and the jitter buffer). |
| How Ki.CL gets it                | Like `api`. The Rust bridge serves the remote at `/arm/client/*` and the socket at `/arm/link`. Ki.CL proxies `/arm/*` to it on its own origin (`KICL_ARM_URL`, `http://localhost:3200` locally) and loads `/arm/client/remoteEntry.js`. Types land in `App/@mf-types/arm`. Same-origin also lets the brain workers start.                                |
| Old code                         | None of the deleted factory-arm view or of Ki.CL-arm's `main` is reused or followed. Ki.CL-arm work is on the `robotic-arm-sim` branch.                                                                                                                                                                                                                   |
| Rendering                        | React Three Fiber and drei. No physics engine on the client.                                                                                                                                                                                                                                                                                              |
| Physics                          | PhysX, on GCP only (Isaac Sim). In CLASSIC mode the floor is kinematic: a held case follows the pad, and a released case drops onto the highest thing under it.                                                                                                                                                                                           |
| Grid                             | A local axial hex grid, not Uber H3. See below.                                                                                                                                                                                                                                                                                                           |
| Wire                             | WebSocket and protobuf on `/arm/link`. No gRPC: browsers cannot speak it, and gRPC-Web has no bidirectional streaming.                                                                                                                                                                                                                                    |
| Access                           | Every endpoint is gated. Visitor actions carry the session token. Service-to-service calls use ID tokens. In production the bridge sits in front (Cloud Run, gated) and the GPU machine is reachable only from it over the VPC.                                                                                                                           |
| Where brains run                 | In a few workers from the remote, up to four, with robots dealt to them in turn. One worker per robot would cost 50 threads at 50 arms.                                                                                                                                                                                                                   |
| Bus                              | 50 ticks a second. The floor sends every robot's sensors each tick, and commands land a tick later.                                                                                                                                                                                                                                                       |
| Scale                            | One component and one brain per robot, and cases as one instanced mesh per kind, so more robots means more entries rather than new code.                                                                                                                                                                                                                  |

### Why not H3

H3 indexes the globe in latitude and longitude, so a flat floor needs an anchor and a resolution. An H3 parent's seven children only roughly cover it, so "a pallet hex sits inside its arm hex" becomes a fuzzy geometric test.

The floor uses one fine axial hex grid instead. An arm cell is a rosette: one fine hex and its six neighbours. Rosettes tile the plane with no gaps, so every fine hex belongs to exactly one cell, and "is this pallet inside its arm's cell" is a set lookup. If a factory ever needs a place on the globe, it gets one latitude and longitude anchor, not an index per cell.

- Arm: stands on its cell's centre hex.
- Pallet: sits on one of its cell's six outer hexes.
- Belts, workers, AMRs, static obstacles: free positions on the floor, located by the fine hex they are over.

The grid is shared by the floor and the brains. It lives in Ki.CL-arm and the floor imports it from `arm/grid`.

## The interface between an arm and its brain

The same frame types are used whichever brain is behind them. That is what lets CLASSIC and PHYSICAL_AI swap mid-move.

The frames are `arm/frames` (`client/src/frames.ts` in Ki.CL-arm).

Floor to arm brain, every bus tick (`ArmSensors`):

- Joint encoders: position and velocity per joint.
- Gripper: vacuum on or off, contact, payload weight.
- Cell vision: the cases and pallets the cell camera sees, each as a top-face centre, size and yaw in the arm's frame. It also marks the case waiting at the belt's end and the case on the pad. Raw images come later, for physical AI.
- Safety scanner: whether a person is inside the cell.
- Clock: tick number and time, so a brain can tell a late frame from a lost one.

Arm brain to floor (`ArmCommands`): joint targets and the vacuum. The drives move towards the targets no faster than each joint's top speed.

An AMR has the same shape. Odometry, deck state, the distance to the nearest person ahead and its current task go out. Speed, turn rate and deck lift come back, along with the id of the task it has finished.

The arm brain keeps no tally of its own. It works out where the next case goes from what the camera sees, so a fresh brain carries on mid-pallet. It also picks up mid-move or holding a case without being told what came before.

### Classic brains

- Arm (`brains/arm` in Ki.CL-arm): closed-form IK with the pad always facing down. Moves ease round the base in angle, radius and height, so a move at one height stays at that height. The arm travels at a height clear of everything the camera sees in the cell. Each case goes on the lowest flat patch of a pallet that fits it, in either orientation square to the pallet. The arm holds still while the scanner sees a person.
- AMR (`brains/amr` in Ki.CL-arm): A* over the hex grid round a map of blocked hexes it is loaded with: walls, pillars, posts, belts, arm cells except its goal slot, and the floor's edge. It steers hex by hex, stops when a person is within 1.6 m ahead, then turns to the task's facing and raises or lowers its deck.
- Fleet manager (`floor/world/dispatch.ts`): part of the floor, not a robot. When a pallet holds 12 cases and its arm holds none, it sends a free AMR to take it to that AMR's own staging hex at the depot, where it is emptied. The AMR then returns it to its slot and parks at its own parking hex. Both brains also refuse to let go unless the camera sees a pallet under the pad, so a pallet taken away mid-carry costs a replan, not a dropped case.

### Handover

When a robot changes brain, the router (`arm/brains`, `handover.ts` in Ki.CL-arm) takes a snapshot from its last sensor frame: joint positions and velocities, vacuum, the held case's id, and its grip (the case's yaw less the pad's). The snapshot goes to the incoming brain in its attach message, and that brain starts from it. The classic brain starts with its target at the snapshot's joints and its vacuum as the snapshot has it. The twin sets Isaac's joints and joint speeds to the snapshot and keeps the held case under the pad.

Until the incoming brain answers, the router itself tells the robot to hold still at the snapshot, vacuum unchanged. The incoming brain's first command has to continue from the snapshot: no joint further from it than the joint moves in a quarter of a second, and no letting go of a held case. A first command that fails is dropped and counted, and the robot keeps holding until one passes. The router's `counts()` reports robots still being handed over and first commands refused.

### The link

`arm/brains` routes each robot to its brain: the cabinet of workers, or the link, one WebSocket to the bridge at `/arm/link`. The floor sends every frame to it and takes back the commands due each tick, without knowing which side answered. Answers from the side a robot has just left are ignored.

On the wire the frames are protobuf, generated in Ki.CL-arm from `proto/`. Commands from the link pass through a jitter buffer that releases them two ticks (40 ms) behind the floor's clock. It counts commands that arrive after their slot and drops any older than the last one released. The link reports its round-trip time per tick.

The panel's Physical AI switch moves robots to the link and back, handing each one over as above. It only shows when `KICL_ARM_LINK` is set.

### Physical AI

The Physical AI switch puts the first arm on the twin: Isaac Sim (PhysX) on the GCP machine, mirroring the arm's cell from its vision frames, with cuMotion's RMPflow moving it and a task planner deciding which case goes where. The other robots stay classic, because the twin mirrors one arm for now. The twin answers with its arm's joints and vacuum, and the floor's drives follow them. So the frames on the wire are the same whichever brain answers.

The path is page → `/arm/link` on the bridge → (`BRIDGE_UPSTREAM`, an IAP tunnel locally) → the twin. Without the twin, the bridge answers by holding still. Ki.CL-arm's README covers how to run each piece.

## Plan

Each step is done in both repos as needed, and each one runs before the next starts.

1. **Scene.** Route, R3F floor on the hex grid, the arm as a scene graph (`base → shoulder → upper arm → forearm → wrist → vacuum gripper`, one rotation per joint), pallet, belt with `length` and surface speed, cases (box, crate, tub, cylinder, with `weight`, `dimensions` and `friction` in their metadata), walls and pillars, workers walking a path, AMR with a flat deck for one pallet.
2. **Classic brains.** In Ki.CL-arm's remote, in workers. The arm runs analytical IK and waypoint trajectories through pick pose, grip, waypoints, place pose and release, with obstacle-aware planning on the hex grid. The AMR runs A* on the hex grid from staging to an arm's cell, routes round static obstacles and stops when a worker crosses its path.
3. **Link.** Protobuf schema for the frames (`proto/` in Ki.CL-arm), the bridge's socket on `/arm/link`, and the floor's client for it. Frames stream at 30 to 60 Hz, with interpolation on the way in.
4. **Physical AI on GCP.** Isaac Sim mirrors a cell, the bridge speaks the schema, and the floor's Physical AI toggle switches an arm to it.
5. **Handover.** The snapshot and continuity rules above, tested mid-move with a case held.
6. **Scale and metrics.** A panel that spawns up to 50 arms, 20 AMRs and hundreds of cases, showing render time, link round-trip time and dropped frames.

## Running it

Run `make run` in Ki.CL-arm, checked out beside this repo. It builds the remote as it changes and serves it, with the bridge, on :3200. Then run `make run` here. `make test.robotic-arm` runs the floor's headless test against Ki.CL-arm's source. The robots' and brains' own tests run in Ki.CL-arm with `make test`.

## Metrics

`floor/metrics.ts` gathers, every frame and without React:

- Render: frames a second, and the middle and slowest (95th percentile) frame time over the last 2 seconds.
- Dropped frames: frames that took more than 1.5 times the usual frame, now and in all.
- Floor step: main-thread milliseconds for the plant, plus reading the sensors on a bus tick.
- The bus: ticks a second, the link's round trip, commands that came late to the jitter buffer, and refused handovers.

The panel reads them twice a second.

## Status

- Steps 1 to 5: done. Step 4 covers one arm on the twin. The twin pools 4 rigs, one per page, and has no live obstacle avoidance yet.
- Step 6: done. `floor/world/scale.test.ts` runs the largest floor (50 arms, 20 AMRs) for 300 seconds headless. It places over 500 cases with none on the floor, has pallets out with AMRs throughout, and stays near 1.5 ms of main-thread time per tick. On this machine a 400-second run placed 1,105 cases: 0.28 ms per tick for the plant, 1.05 ms for the sensors, and 0.61 ms for all 70 classic brains together (in the page they run in workers). Not yet measured in a browser at 50 arms.
