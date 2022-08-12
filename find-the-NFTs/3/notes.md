To get this one, you have to pass the value in the 777th storage location
And then we use psuedo-randomness to pick to the next value.
This will test your hardhat and ethers chops!

ce que je renvoie doit ressembler à ça : 000000000000000000000000000000000000000000000000000000000007efe9
ou ça : 00000000000000000000000000000000000000000000000000000000000d37cd
en fait non, ça met le message d'erreur la : invalid number value (arg="valueAtStorageLocationSevenSevenSeven", coderType="uint256", value="000000000000000000000000000000000000000000000000000000000007efe9")

---

utilise un mécanisme pour trouver un nombre "aléatoire"
but est de retrouver quel nombre a été enregistré dans le storage 777

doit ressembler à :
216483
241923

Méthode :
uint256 newValue = uint256(keccak256(abi.encodePacked(msg.sender, block.difficulty, block.timestamp))) % 1000000;

les valeurs sont celles de la transaction de la personne précédente

tester avec remix

uint256 newValue = uint256(keccak256(abi.encodePacked("0x769a00b6ef2c67bccdc5a5c4844ce2223233928d", "5280", "
19935301"))) % 1000000;

tester a quoi ressemble block.difficulty ET block.timestamp
