#!/usr/bin/env bash
# Copies the production services from SOURCE_REGION into REGION and has the
# main triggers deploy there too. Run again, it brings the copies back in line
# with the source: same image, same settings, REGION's subnet and URLs.
source "$(dirname "$0")/env.sh"

if [ "$REGION" = "$SOURCE_REGION" ]; then
  echo "$REGION is where services are copied from" >&2
  exit 1
fi

# Direct VPC egress sends all of a service's traffic into the subnet, so it needs NAT to reach anything public.
if ! have gcloud compute networks subnets describe "$SUBNET" --region "$REGION"; then
  echo "subnet: $SUBNET ($RANGE)"
  gcloud compute networks subnets create "$SUBNET" --project "$PROJECT" --network "$NETWORK" \
    --region "$REGION" --range "$RANGE" --enable-private-ip-google-access >/dev/null
fi
if ! have gcloud compute routers describe "$ROUTER" --region "$REGION"; then
  echo "nat: $NAT in $REGION"
  gcloud compute routers create "$ROUTER" --project "$PROJECT" --network "$NETWORK" --region "$REGION" >/dev/null
  gcloud compute routers nats create "$NAT" --project "$PROJECT" --router "$ROUTER" \
    --region "$REGION" --auto-allocate-nat-external-ips --nat-all-subnet-ip-ranges >/dev/null
fi

work="$(mktemp -d)"
trap 'rm -rf "$work"' EXIT

# A service URL in an env var points at its copy in REGION. Cloud Run gives each
# service two URL forms, a hashed one (….a.run.app) and a numbered one.
services="$(echo "$SERVICES" | tr ' ' '|')"
for service in $SERVICES; do
  echo "service: $service → $REGION"
  gcloud run services describe "$service" --project "$PROJECT" --region "$SOURCE_REGION" --format export |
    sed -E \
      -e '/run.googleapis.com\/(build-|urls|ingress-status|client-name|client-version|operation-id)/d' \
      -e '/serving.knative.dev\/(creator|lastModifier)/d' \
      -e '/client.knative.dev\/nonce/d' \
      -e '/^    name: .*-[0-9]{5}-/d' \
      -e "s/cloud.googleapis.com\/location: $SOURCE_REGION/cloud.googleapis.com\/location: $REGION/" \
      -e "s/\"subnetwork\":\"$SOURCE_SUBNET\"/\"subnetwork\":\"$SUBNET\"/" \
      -e "s#https://($services)-([a-z0-9]+-[a-z]+\.a\.run\.app|$PROJECT_NUMBER\.$SOURCE_REGION\.run\.app)#https://\1-$PROJECT_NUMBER.$REGION.run.app#g" \
      > "$work/$service.yaml"
  gcloud run services replace "$work/$service.yaml" --project "$PROJECT" --region "$REGION" --quiet >/dev/null

  gcloud run services get-iam-policy "$service" --project "$PROJECT" --region "$SOURCE_REGION" --format json |
    python3 -c 'import json, sys; d = json.load(sys.stdin); d.pop("etag", None); print(json.dumps(d))' > "$work/$service.iam.json"
  gcloud run services set-iam-policy "$service" "$work/$service.iam.json" \
    --project "$PROJECT" --region "$REGION" --quiet >/dev/null
done

# Each main trigger gets a second deploy step for REGION, a copy of its Deploy step.
for trigger in $TRIGGERS; do
  gcloud builds triggers describe "$trigger" --project "$PROJECT" --format json > "$work/trigger.json"
  added="$(python3 - "$work/trigger.json" "$REGION" <<'PY'
import json, sys
path, region = sys.argv[1], sys.argv[2]
trigger = json.load(open(path))
steps = trigger['build']['steps']
if any(f'--region={region}' in step.get('args', []) for step in steps):
    sys.exit()
deploy = json.loads(json.dumps(next(step for step in steps if step.get('id') == 'Deploy')))
deploy['id'] = f'Deploy {region}'
deploy['args'] = [f'--region={region}' if arg.startswith('--region=') else arg for arg in deploy['args']]
steps.append(deploy)
trigger.pop('createTime', None)
json.dump(trigger, open(path, 'w'))
print('added')
PY
)"
  if [ -n "$added" ]; then
    gcloud builds triggers import --project "$PROJECT" --source "$work/trigger.json" >/dev/null
    echo "trigger: $trigger also deploys to $REGION"
  fi
done

gcloud run services list --project "$PROJECT" --region "$REGION" --format 'table(metadata.name,status.url)'
