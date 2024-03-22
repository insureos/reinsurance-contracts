import * as anchor from "@coral-xyz/anchor";
import { Insurance } from "../target/types/insurance";
import {
  create_keypair,
  get_pda_from_seeds,
  get_metadata_account,
  calculate_expiry_time,
  sleep,
} from "./helper";
import {
  insurerDescription,
  insuranceId,
  coverage,
  minimumCommission,
  premium,
  deductible,
  mintAmount,
  insuranceMetadataLink,
  proposedCommision,
  proposeduUndercollaterization,
  proposalMetadataLink,
  securityAmount,
  TOKEN_METADATA_PROGRAM_ID,
  premiumMultiplier,
  idealSize,
  tokenName,
  tokenimage,
  tokenMetadata,
  strategyId,
  streamPayment,
  streamEvery,
  numberOfStreams,
  strategyProgram,
  claimId,
  claimAmount,
  claimMetadataLink,
} from "./constant";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
  createMint,
  mintTo,
  transfer,
  getOrCreateAssociatedTokenAccount,
} from "@solana/spl-token";
import { rpcConfig } from "./test_config";

describe("insurance", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Insurance as anchor.Program<Insurance>;
  const { web3 } = anchor;
  const {
    provider: { connection },
  } = program;
  let global: any = {};

  it("Create insurer!", async () => {
    const insuranceCreator = await create_keypair();
    const insurer = await get_pda_from_seeds([
      insuranceCreator.publicKey.toBuffer(),
    ]);
    await program.methods
      .registerInsurer(insurerDescription)
      .accounts({
        insuranceCreator: insuranceCreator.publicKey,
        insurer: insurer,
        systemProgram: web3.SystemProgram.programId,
      })
      .signers([insuranceCreator])
      .rpc(rpcConfig);

    global.insuranceCreator = insuranceCreator;
    global.insurer = insurer;
  });

  it("Creates a LP!", async () => {
    const lpCreator = await create_keypair();
    const lp = await get_pda_from_seeds([lpCreator.publicKey.toBuffer()]);
    const tokenisedMint = await get_pda_from_seeds([
      Buffer.from("i_am_in_love"),
      Buffer.from("withacriminl"),
      lp.toBuffer(),
    ]);

    const securityMint = await getAssociatedTokenAddress(
      tokenisedMint,
      lp,
      true
    );

    const metadataAddress = await get_metadata_account(tokenisedMint);

    await program.methods
      .registerLp(idealSize, tokenName, tokenimage, tokenMetadata)
      .accounts({
        lpCreator: lpCreator.publicKey,
        lp: lp,
        tokenisedMint: tokenisedMint,
        securityMint: securityMint,
        metadata: metadataAddress,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
        systemProgram: web3.SystemProgram.programId,
      })
      .signers([lpCreator])
      .rpc(rpcConfig);

    global.lpCreator = lpCreator;
    global.lp = lp;
    global.tokenisedMint = tokenisedMint;
    global.securityMint = securityMint;
  });

  it("Registers an insurance", async () => {
    const insurance = await get_pda_from_seeds([
      global.insuranceCreator.publicKey.toBuffer(),
      Buffer.from(insuranceId),
    ]);

    await program.methods
      .registerInsurance(
        insuranceId,
        coverage,
        premium,
        minimumCommission,
        deductible,
        calculate_expiry_time(),
        insuranceMetadataLink
      )
      .accounts({
        insuranceCreator: global.insuranceCreator.publicKey,
        insurer: global.insurer,
        insurance: insurance,
        systemProgram: web3.SystemProgram.programId,
      })
      .signers([global.insuranceCreator])
      .rpc(rpcConfig);
    global.insurance = insurance;
  });
  it("Proposes an insurance proposal", async () => {
    const proposal = await get_pda_from_seeds([
      global.lp.toBuffer(),
      global.insurance.toBuffer(),
    ]);
    const proposalProposer = await create_keypair();
    const proposalTokenAccount = await getAssociatedTokenAddress(
      global.tokenisedMint,
      proposal,
      true
    );

    await program.methods
      .proposeInsuranceProposal(
        proposedCommision,
        proposeduUndercollaterization,
        proposalMetadataLink
      )
      .accounts({
        proposalProposer: proposalProposer.publicKey,
        lp: global.lp,
        insurance: global.insurance,
        proposal: proposal,
        tokenisedMint: global.tokenisedMint,
        proposalTokenAccount: proposalTokenAccount,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        systemProgram: web3.SystemProgram.programId,
      })
      .signers([proposalProposer])
      .rpc(rpcConfig);
    global.proposal = proposal;
  });
  it("Add security", async () => {
    // note: This will not work on pushed contracts
    const mintAddress = await createMint(
      connection,
      global.lpCreator,
      global.lpCreator.publicKey,
      global.lpCreator.publicKey,
      6
    );

    const securityAddr = await create_keypair();
    const securityAddrUSDCAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      securityAddr,
      mintAddress,
      securityAddr.publicKey
    );

    await mintTo(
      connection,
      securityAddr,
      mintAddress,
      securityAddrUSDCAccount.address,
      global.lpCreator,
      mintAmount
    );

    const lpMintAccount = await getAssociatedTokenAddress(
      mintAddress,
      global.lp,
      true
    );

    const securityAdrrTokenAccount = await getAssociatedTokenAddress(
      global.tokenisedMint,
      securityAddr.publicKey,
      true
    );

    await program.methods
      .addSecurity(securityAmount)
      .accounts({
        securityAddr: securityAddr.publicKey,
        securityAddrUsdcAcc: securityAddrUSDCAccount.address,
        securityAdderTokenAddr: securityAdrrTokenAccount,
        securityMint: global.securityMint,
        lp: global.lp,
        tokenisedMint: global.tokenisedMint,
        lpUsdcAccount: lpMintAccount,
        usdcMint: mintAddress,
        systemProgram: web3.SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      })
      .signers([securityAddr])
      .rpc(rpcConfig);
    global.mintAddress = mintAddress;
    global.securityAddr = securityAddr;
    global.securityAddrUSDCAccount = securityAddrUSDCAccount;
    global.securityAdrrTokenAccount = securityAdrrTokenAccount;
  });
  it("Vote on insurance proposal", async () => {
    const voteProposalAccount = await get_pda_from_seeds([
      Buffer.from("vote"),
      global.proposal.toBuffer(),
      global.securityAddr.publicKey.toBuffer(),
    ]);
    const voteProposalTokenAccount = await getAssociatedTokenAddress(
      global.tokenisedMint,
      voteProposalAccount,
      true
    );
    await program.methods
      .voteInsuranceProposal(securityAmount)
      .accounts({
        voter: global.securityAddr.publicKey,
        voterTokenAccount: global.securityAdrrTokenAccount,
        tokenisedMint: global.tokenisedMint,
        voteProposalAccount: voteProposalAccount,
        voteProposalTokenAccount: voteProposalTokenAccount,
        insurance: global.insurance,
        proposal: global.proposal,
        lp: global.lp,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        systemProgram: web3.SystemProgram.programId,
      })
      .signers([global.securityAddr])
      .rpc(rpcConfig);
    global.voteProposalAccount = voteProposalAccount;
    global.voteProposalTokenAccount = voteProposalTokenAccount;
  });
  it("Get insurance proposal vote money back", async () => {
    await sleep(5);
    await program.methods
      .refundProposalVote()
      .accounts({
        voter: global.securityAddr.publicKey,
        voterTokenAccount: global.securityAdrrTokenAccount,
        lp: global.lp,
        insurance: global.insurance,
        proposal: global.proposal,
        tokenisedMint: global.tokenisedMint,
        voteProposalAccount: global.voteProposalAccount,
        voteProposalTokenAccount: global.voteProposalTokenAccount,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        systemProgram: web3.SystemProgram.programId,
      })
      .signers([global.securityAddr])
      .rpc(rpcConfig);
  });
  it("Send insurance Proposal", async () => {
    const notifier = await create_keypair();
    await program.methods
      .acceptProposal()
      .accounts({
        notifier: notifier.publicKey,
        lp: global.lp,
        proposal: global.proposal,
      })
      .signers([notifier])
      .rpc(rpcConfig);
  });
  it("Accept insurance proposal", async () => {
    await program.methods
      .acceptReinsuranceProposal()
      .accounts({
        insuranceCreator: global.insuranceCreator.publicKey,
        insurance: global.insurance,
        lp: global.lp,
        proposal: global.proposal,
        systemProgram: web3.SystemProgram.programId,
      })
      .signers([global.insuranceCreator])
      .rpc(rpcConfig);
  });
  it("Pay premium on insurance", async () => {
    const premiumVault = await get_pda_from_seeds([
      Buffer.from("premium"),
      global.insurance.toBuffer(),
      global.proposal.toBuffer(),
    ]);
    const premiumVaultTokenAccount = await getAssociatedTokenAddress(
      global.mintAddress,
      premiumVault,
      true
    );

    const insuranceCreatorUsdcAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      global.insuranceCreator,
      global.mintAddress,
      global.insuranceCreator.publicKey
    );

    await transfer(
      connection,
      global.insuranceCreator,
      global.securityAddrUSDCAccount.address,
      insuranceCreatorUsdcAccount.address,
      global.securityAddr,
      securityAmount.toNumber()
    );

    await program.methods
      .payPremium(premiumMultiplier)
      .accounts({
        insuranceCreator: global.insuranceCreator.publicKey,
        insurance: global.insurance,
        premiumVault: premiumVault,
        premiumVaultTokenAccount: premiumVaultTokenAccount,
        insuranceCreatorUsdcAccount: insuranceCreatorUsdcAccount.address,
        proposal: global.proposal,
        lp: global.lp,
        usdcMint: global.mintAddress,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: web3.SystemProgram.programId,
      })
      .signers([global.insuranceCreator])
      .rpc(rpcConfig);
    global.premiumVault = premiumVault;
  });
  it("Raise claim", async () => {
    const claim = await get_pda_from_seeds([
      Buffer.from("claim"),
      global.proposal.toBuffer(),
      Buffer.from(claimId),
    ]);
    await program.methods
      .raiseClaim(claimId, claimAmount, claimMetadataLink)
      .accounts({
        insuranceCreator: global.insuranceCreator.publicKey,
        insurance: global.insurance,
        lp: global.lp,
        proposal: global.proposal,
        claim: claim,
        systemProgram: web3.SystemProgram.programId,
      })
      .signers([global.insuranceCreator])
      .rpc(rpcConfig);
  });
  it("Propose strategy", async () => {
    const strategyProposer = await create_keypair();
    const proposedStrategy = await get_pda_from_seeds([
      Buffer.from("strategy"),
      Buffer.from(strategyId),
      global.premiumVault.toBuffer(),
    ]);

    await program.methods
      .proposeStrategy(strategyId, streamPayment, streamEvery, numberOfStreams)
      .accounts({
        strategyProposer: strategyProposer.publicKey,
        premiumVault: global.premiumVault,
        strategyProgram: strategyProgram,
        proposedStrategy: proposedStrategy,
        systemProgram: web3.SystemProgram.programId,
      })
      .signers([strategyProposer])
      .rpc(rpcConfig);
  });
  it("Vote strategy", async () => {});
});
