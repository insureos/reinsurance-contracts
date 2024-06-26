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
 * @category AcceptProposal
 * @category generated
 */
export const acceptProposalStruct = new beet.BeetArgsStruct<{
  instructionDiscriminator: number[] /* size: 8 */;
}>(
  [["instructionDiscriminator", beet.uniformFixedSizeArray(beet.u8, 8)]],
  "AcceptProposalInstructionArgs"
);
/**
 * Accounts required by the _acceptProposal_ instruction
 *
 * @property [**signer**] notifier
 * @property [] lp
 * @property [_writable_] proposal
 * @category Instructions
 * @category AcceptProposal
 * @category generated
 */
export type AcceptProposalInstructionAccounts = {
  notifier: web3.PublicKey;
  lp: web3.PublicKey;
  proposal: web3.PublicKey;
  anchorRemainingAccounts?: web3.AccountMeta[];
};

export const acceptProposalInstructionDiscriminator = [
  33, 190, 130, 178, 27, 12, 168, 238,
];

/**
 * Creates a _AcceptProposal_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @category Instructions
 * @category AcceptProposal
 * @category generated
 */
export function createAcceptProposalInstruction(
  accounts: AcceptProposalInstructionAccounts,
  programId = new web3.PublicKey("DajsLYULhHh3SVSDHsCCvnuHD8JeXgVf5mjfnQWpwzix")
) {
  const [data] = acceptProposalStruct.serialize({
    instructionDiscriminator: acceptProposalInstructionDiscriminator,
  });
  const keys: web3.AccountMeta[] = [
    {
      pubkey: accounts.notifier,
      isWritable: false,
      isSigner: true,
    },
    {
      pubkey: accounts.lp,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.proposal,
      isWritable: true,
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
