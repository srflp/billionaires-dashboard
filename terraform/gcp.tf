locals {
  project_id       = "billionaires-dashboard"
  network          = "default"
  image            = "ubuntu-os-cloud/ubuntu-2204-lts"
  machine_type     = "e2-micro"
  region           = "us-east1"
  zone             = "us-east1-b"
  ssh_user         = "ansible"
  private_key_path = "~/.ssh/ansible_billionaires-dashboard_gcp_ed25519"
}

provider "google" {
  credentials = file("billionaires-dashboard-credentials.json")
  project     = local.project_id
  region      = local.region
}

resource "google_compute_instance" "db" {
  name         = "db"
  tags         = ["db"]
  machine_type = local.machine_type
  zone         = local.zone

  boot_disk {
    initialize_params {
      image = local.image
    }
  }

  network_interface {
    network = local.network

    access_config {
      // Ephemeral IP
    }
  }

  service_account {
    scopes = ["cloud-platform"]
  }


  provisioner "remote-exec" {
    inline = ["echo 'Wait until SSH is ready'"]

    connection {
      type        = "ssh"
      user        = local.ssh_user
      private_key = file(local.private_key_path)
      host        = self.network_interface[0].access_config[0].nat_ip
    }
  }

  provisioner "local-exec" {
    command = "ansible-playbook -i ${self.network_interface[0].access_config[0].nat_ip}, -u ${local.ssh_user}  --private-key ${local.private_key_path} ansible/db.yml"
  }
}

resource "google_compute_instance" "backend" {
  name         = "backend"
  tags         = ["backend"]
  machine_type = local.machine_type
  zone         = local.zone

  boot_disk {
    initialize_params {
      image = local.image
    }
  }

  network_interface {
    network = local.network

    access_config {
      // Ephemeral IP
    }
  }

  service_account {
    scopes = ["cloud-platform"]
  }


  provisioner "remote-exec" {
    inline = ["echo 'Wait until SSH is ready'"]

    connection {
      type        = "ssh"
      user        = local.ssh_user
      private_key = file(local.private_key_path)
      host        = self.network_interface[0].access_config[0].nat_ip
    }
  }

  provisioner "local-exec" {
    command = "ansible-playbook -i ${self.network_interface[0].access_config[0].nat_ip}, -u ${local.ssh_user} --private-key ${local.private_key_path} -e 'postgres_ip=${google_compute_instance.db.network_interface[0].access_config[0].nat_ip}' ansible/backend.yml"
  }
}

resource "google_compute_instance" "frontend" {
  name         = "frontend"
  tags         = ["frontend"]
  machine_type = "e2-small"
  zone         = local.zone

  boot_disk {
    initialize_params {
      image = local.image
    }
  }

  network_interface {
    network = local.network

    access_config {
      // Ephemeral IP
    }
  }

  service_account {
    scopes = ["cloud-platform"]
  }


  provisioner "remote-exec" {
    inline = ["echo 'Wait until SSH is ready'"]

    connection {
      type        = "ssh"
      user        = local.ssh_user
      private_key = file(local.private_key_path)
      host        = self.network_interface[0].access_config[0].nat_ip
    }
  }

  provisioner "local-exec" {
    command = "ansible-playbook -i ${self.network_interface[0].access_config[0].nat_ip}, -u ${local.ssh_user} --private-key ${local.private_key_path} -e 'backend_url=http://${google_compute_instance.backend.network_interface.0.access_config.0.nat_ip}:3000/' ansible/frontend.yml"
  }
}

// Firewall rule to allow backend to access db
resource "google_compute_firewall" "backend-to-db" {
  name    = "backend-to-db"
  network = local.network

  allow {
    protocol = "tcp"
    ports    = ["5432"]
  }

  source_tags = ["backend"]
  target_tags = ["db"]
}

resource "google_compute_firewall" "web-to-backend" {
  name    = "web-to-backend"
  network = local.network

  allow {
    protocol = "tcp"
    ports    = ["3000"]
  }

  source_ranges = ["0.0.0.0/0"]
  target_tags   = ["backend"]
}

resource "google_compute_firewall" "web-to-frontend" {
  name    = "web-to-frontend"
  network = local.network

  allow {
    protocol = "tcp"
    ports    = ["80"]
  }

  source_ranges = ["0.0.0.0/0"]
  target_tags   = ["frontend"]
}

output "backend_ip" {
  value = google_compute_instance.backend.network_interface.0.access_config.0.nat_ip
}
output "frontend_ip" {
  value = google_compute_instance.frontend.network_interface.0.access_config.0.nat_ip
}

