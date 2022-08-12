soit on doit posséder un contract (et le hacker) soit on doit avoir tout les nfts, mais ça me semble moins probable

on doit etre l'owner du contract vulnerable

callcontract et callcontractAgain doivent fonctionner et aller jusqu'au bout pour valider le mint

Il n'y as qu'a mint un nft, pas d'autre transaction a faire

entrer une addresse et un selector

---

créer un contract pour faire un renentrancy attack

lors du mint, entrer l'addresse du contract qu'on a créé
et un selector, qui ressemble à : 0xbcb030c8

en fonction du selector, on doit retomber sur s_otherVar = 2
