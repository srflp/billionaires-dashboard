# billionaires-dashboard

A sample app developed to learn Docker, Vagrant, Kubernetes and Terraform during "Cloud Applications" course on my university.

## Local development using Docker

Run:

```bash
pnpm dev
```

Website should be available at http://localhost:3001/

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

Website should be available at http://localhost:8080/

To suspend:

```bash
vagrant suspend
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

Website should be available at http://localhost:3001/

To delete the cluster:

```bash
kubectl delete -f k8s/
```

## Terraform

Enter terraform directory:

```bash
cd terraform
```

To deploy do GCP, run:

```bash
terraform apply
```

To destroy all resources, run:

```bash
terraform destroy
```
