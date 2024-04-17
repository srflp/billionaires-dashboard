# billionaires-dashboard

A sample app developed to learn Docker, Vagrant, Kubernetes and Terraform during "Cloud Applications" course on my university.

## Local development using Docker

Run:

```bash
pnpm dev
```

To enable HMR, run also this script in a new terminal:

```bash
pnpm dev-watch
```

(this is how Docker Compose Watch is working)

## Vagrant

To start:

```bash
vagrant up
```

To stop:

```bash
vagrant halt
```

To destroy:

```bash
vagrant destroy
```

## Kubernetes

To start the cluster:

```bash
kubectl apply -f k8s/
```

To delete the cluster:

```bash
kubectl delete -f k8s/
```

## Terraform

todo
