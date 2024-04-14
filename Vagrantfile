Vagrant.configure("2") do |config|
  config.vm.box = "bento/ubuntu-22.04-arm64"

  config.vm.provider :vmware_desktop do |vmware|
    vmware.vmx["ethernet0.pcislotnumber"] = "160"
    vmware.vmx["ethernet1.pcislotnumber"] = "224"
  end

  config.vm.define "db" do |db|
    db.vm.hostname = "db"
    db.vm.provision :ansible do |ansible|
      ansible.playbook = "playbooks/db.yml"
      ansible.compatibility_mode = "2.0"
    end
    db.vm.network :private_network, ip: "192.168.33.30"
  end

  config.vm.define "backend" do |backend|
    backend.vm.hostname = "backend"
    backend.vm.provision :ansible do |ansible|
      ansible.playbook = "playbooks/backend.yml"
      ansible.compatibility_mode = "2.0"
    end
    backend.vm.network :private_network, ip: "192.168.33.20"
  end

  config.vm.define "frontend" do |frontend|
    frontend.vm.hostname = "frontend"
    frontend.vm.provision :ansible do |ansible|
      ansible.playbook = "playbooks/frontend.yml"
      ansible.compatibility_mode = "2.0"
    end
    frontend.vm.network :private_network, ip: "192.168.33.10"
    frontend.vm.network :forwarded_port, guest: 80, host: 8080, host_ip: "127.0.0.1"
  end
end
