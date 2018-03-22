pragma solidity ^0.4.19;

contract Splitter {

  struct Person {
    address addr;
    string name;
  }

  struct Recipients {
    Person a;
    Person b;
  }

  address public owner;
  Person[] public participants;

  event LogAddParticipant(address addr, string name);
  event LogPay(address addr, string name, uint amount);

  function Splitter() public {
    owner = msg.sender;
  }

  function addParticipant(address addr, string name) private {
    LogAddParticipant(addr, name);
    participants.push(Person(addr, name));
  }

  function addParticipants(address alice, address bob, address carol) public {
    require(msg.sender == owner);
    require(participants.length == 0);
    // addresses must be unique
    require(alice != bob && bob != carol && carol != alice);

    addParticipant(alice, 'Alice');
    addParticipant(bob, 'Bob');
    addParticipant(carol, 'Carol');
  }

  function getParticipantsByRoles() private view returns (Person sender, Recipients recipients) {
    require(participants.length == 3);
    for (uint i = 0; i < participants.length; i++) {
      if (participants[i].addr == msg.sender) {
        sender = participants[i];
      } else if (recipients.a.addr == 0) {
        recipients.a = participants[i];
      } else {
        recipients.b = participants[i];
      }
    }
    // fail transaction if msg.sender is not one of the participants
    require(sender.addr != 0);
  }

  function pay() public payable {
    Person memory sender;
    Recipients memory recipients;
    (sender, recipients) = getParticipantsByRoles();
    require(msg.value >= 2);
    uint amountToTransfer = msg.value / 2;
    recipients.a.addr.transfer(amountToTransfer);
    LogPay(recipients.a.addr, recipients.a.name, amountToTransfer);
    recipients.b.addr.transfer(amountToTransfer);
    LogPay(recipients.b.addr, recipients.b.name, amountToTransfer);
  }

}
