# blockchainNetwork

This is a docker-compose configuration of an ethereum testnet using proof of authority consensus protocol, with two static nodes 0x466d9994e17352c719359CF58C52ACCB46f447Ff & 0x7b97eB7f51F73fC22BA8D6d1c879869E26ff9Ad2
that are both authoroties in the network and funded initially wit 5 Ethers

# Building

the configuration is meant to be launched on two seperate machines or two different VMs

to launch the config you havae to change static-nodes.json file of each Node to contain the ip of the host of the other Node (enode://[Key@IpOfTheHostOfTheOtherNode:30301])

then launch each node in its hose using command at the directory ./{first|second}Node/
    
    docker-compose up -d

# Block Explorer

once the config is up and running in separate hosts, the firstNode contains a block explorer that you can access through http://{firstNodeHostIp}:4000/ if accessible

![alt_text](https://github.com/Ethereumx/LCproject/blob/main/blockchainNetwork/blockExplorer.png)

# Connect to peer Geth node

use command to get the running containers

    docker ps

then run this command to exec into the nodeContainer

    docker exec -it nodeContainer_id sh

then run

    geth attach http://localhost:8545
    
and Voila you'll have the JS geth console where you can try for example to check the balance of the first account already existing in the keystore using command
    
    eth.getBalance(personal.listAccounts[0])
