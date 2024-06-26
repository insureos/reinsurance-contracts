/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as beet from "@metaplex-foundation/beet";
import * as web3 from "@solana/web3.js";

/**
 * @category Instructions
 * @category AcceptStrategy
 * @category generated
 */
export const acceptStrategyStruct = new beet.BeetArgsStruct<{
  instructionDiscriminator: number[] /* size: 8 */;
}>(
  [["instructionDiscriminator", beet.uniformFixedSizeArray(beet.u8, 8)]],
  "AcceptStrategyInstructionArgs"
);
/**
 * Accounts required by the _acceptStrategy_ instruction
 *
 * @property [**signer**] strategyAccepter
 * @property [_writable_] lp
 * @property [] tokenisedMint
 * @property [] insurance
 * @property [] proposal
 * @property [] premiumVault
 * @property [_writable_] proposedStrategy
 * @category Instructions
 * @category AcceptStrategy
 * @category generated
 */
export type AcceptStrategyInstructionAccounts = {
  strategyAccepter: web3.PublicKey;
  lp: web3.PublicKey;
  tokenisedMint: web3.PublicKey;
  insurance: web3.PublicKey;
  proposal: web3.PublicKey;
  premiumVault: web3.PublicKey;
  proposedStrategy: web3.PublicKey;
  systemProgram?: web3.PublicKey;
  anchorRemainingAccounts?: web3.AccountMeta[];
};

export const acceptStrategyInstructionDiscriminator = [
  179, 212, 54, 139, 14, 91, 211, 124,
];

/**
 * Creates a _AcceptStrategy_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @category Instructions
 * @category AcceptStrategy
 * @category generated
 */
export function createAcceptStrategyInstruction(
  accounts: AcceptStrategyInstructionAccounts,
  programId = new web3.PublicKey("DajsLYULhHh3SVSDHsCCvnuHD8JeXgVf5mjfnQWpwzix")
) {
  const [data] = acceptStrategyStruct.serialize({
    instructionDiscriminator: acceptStrategyInstructionDiscriminator,
  });
  const keys: web3.AccountMeta[] = [
    {
      pubkey: accounts.strategyAccepter,
      isWritable: false,
      isSigner: true,
    },
    {
      pubkey: accounts.lp,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.tokenisedMint,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.insurance,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.proposal,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.premiumVault,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.proposedStrategy,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.systemProgram ?? web3.SystemProgram.programId,
      isWritable: false,
      isSigner: false,
    },
  ];

  if (accounts.anchorRemainingAccounts != null) {
    for (const acc of accounts.anchorRemainingAccounts) {
      keys.push(acc);
    }
  }

  const ix = new web3.TransactionInstruction({
    programId,
    keys,
    data,
  });
  return ix;
}
