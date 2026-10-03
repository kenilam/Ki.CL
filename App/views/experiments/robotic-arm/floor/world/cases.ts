import { padOf } from './frame';
import type { Case, World } from './types';

/** Puts each case where its holder has it: under a pad, on a pallet, or on the floor. Belts move their own. */
const settle = (world: World) => {
  const arms = new Map(world.arms.map((arm) => [arm.id, arm]));
  const pallets = new Map(world.pallets.map((pallet) => [pallet.id, pallet]));

  world.cases.forEach((item: Case) => {
    const { holder, position, size } = item;

    if (holder.kind === 'pad') {
      const arm = arms.get(holder.arm);

      if (arm) {
        const pad = padOf(arm);

        position.x = pad.at.x;
        position.y = pad.at.y - size[1] / 2;
        position.z = pad.at.z;
        item.heading = pad.yaw + holder.yaw;
      }
    } else if (holder.kind === 'pallet') {
      const pallet = pallets.get(holder.pallet);

      if (pallet) {
        const cos = Math.cos(pallet.heading);
        const sin = Math.sin(pallet.heading);

        position.x = pallet.position.x + holder.u * cos + holder.w * sin;
        position.y = pallet.position.y + holder.y;
        position.z = pallet.position.z - holder.u * sin + holder.w * cos;
        item.heading = pallet.heading + holder.yaw;
      }
    } else if (holder.kind === 'floor') {
      position.y = size[1] / 2;
    }
  });
};

export { settle };
