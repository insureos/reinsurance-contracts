use anchor_lang::prelude::*;
use instructions::*;

pub mod constant;
pub mod error;
pub mod event;
pub mod helper;
pub mod instructions;
pub mod state;
pub mod strategy_program_interface;
pub mod utils;

declare_id!("DajsLYULhHh3SVSDHsCCvnuHD8JeXgVf5mjfnQWpwzix");

#[program]
pub mod insurance {
    use super::*;

    pub fn register_insurer(
        ctx: Context<RegisterInsurer>,
        verifying_documents: String,
    ) -> Result<()> {
        register_insurer::handler(ctx, verifying_documents)
    }

    pub fn register_lp(
        ctx: Context<RegisterLP>,
        ideal_size: u64,
        pool_lifecycle: i64,
        token_name: String,
        token_symbol: String,
        token_metadata_uri: String,
    ) -> Result<()> {
        register_lp::handler(
            ctx,
            ideal_size,
            pool_lifecycle,
            token_name,
            token_symbol,
            token_metadata_uri,
        )
    }

    pub fn register_insurance(
        ctx: Context<RegisterInsurance>,
        insurance_id: String,
        coverage: u64,
        premium: u64,
        minimum_commission: i64,
        deductible: u64,
        expiry: i64,
        metadata_link: String,
    ) -> Result<()> {
        register_insurance::handler(
            ctx,
            insurance_id,
            coverage,
            premium,
            minimum_commission,
            deductible,
            expiry,
            metadata_link,
        )
    }

    pub fn propose_insurance_proposal(
        ctx: Context<ProposeInsuranceProposal>,
        proposal_id: String,
        proposal_docs: String,
        proposed_commision: u64,
        proposed_undercollaterization: u64,
    ) -> Result<()> {
        propose_insurance_proposal::handler(
            ctx,
            proposal_id,
            proposal_docs,
            proposed_commision,
            proposed_undercollaterization,
        )
    }
    pub fn accept_reinsurance_proposal(ctx: Context<AcceptReinsuranceProposal>) -> Result<()> {
        accept_reinsurance_proposal::handler(ctx)
    }

    pub fn add_security(ctx: Context<AddSecurity>, transfer_amount: u64) -> Result<()> {
        add_security::handler(ctx, transfer_amount)
    }

    pub fn accept_strategy(ctx: Context<AcceptStrategy>) -> Result<()> {
        accept_strategy::handler(ctx)
    }

    pub fn block_strategy(ctx: Context<BlockStrategy>) -> Result<()> {
        block_strategy::handler(ctx)
    }

    pub fn call_off_reinsurance(ctx: Context<CallOffReinsurance>) -> Result<()> {
        call_off_reinsurance::handler(ctx)
    }

    pub fn claim_decision(ctx: Context<ClaimDecision>) -> Result<bool> {
        claim_decision::handler(ctx)
    }

    pub fn claim_voting_reward(ctx: Context<ClaimVotingReward>, reward_amount: u64) -> Result<()> {
        claim_voting_reward::handler(ctx, reward_amount)
    }

    pub fn execute_strategy(ctx: Context<ExecuteStrategy>) -> Result<()> {
        execute_strategy::handler(ctx)
    }

    pub fn pay_premium(ctx: Context<PayPremiun>, premium_multiplier: u64) -> Result<()> {
        pay_premium::handler(ctx, premium_multiplier)
    }

    pub fn propose_strategy(
        ctx: Context<ProposeStrategy>,
        strategy_id: String,
        stream_payment: u64,
        stream_every: u64,
        number_of_streams: u64,
    ) -> Result<()> {
        propose_strategy::handler(
            ctx,
            strategy_id,
            stream_payment,
            stream_every,
            number_of_streams,
        )
    }

    pub fn raise_claim(
        ctx: Context<RaiseClaim>,
        claim_id: String,
        claim_amount: u64,
        claim_metadata_link: String,
    ) -> Result<()> {
        raise_claim::handler(ctx, claim_id, claim_amount, claim_metadata_link)
    }

    pub fn refund_strategy_vote(ctx: Context<RefundStrategyVote>) -> Result<()> {
        refund_strategy_vote::handler(ctx)
    }

    pub fn release_security(ctx: Context<ReleaseSecurity>) -> Result<()> {
        release_security::handler(ctx)
    }

    pub fn vote_claim(
        ctx: Context<VoteClaim>,
        vote_amount: u64,
        vote_direction: bool,
    ) -> Result<()> {
        vote_claim::handler(ctx, vote_amount, vote_direction)
    }

    pub fn vote_strategy(ctx: Context<VoteStrategy>, vote_amount: u64) -> Result<()> {
        vote_strategy::handler(ctx, vote_amount)
    }

    pub fn vote_insurance_proposal(
        ctx: Context<VoteInsuranceProposal>,
        transfer_amount: u64,
    ) -> Result<()> {
        vote_insurance_proposal::handler(ctx, transfer_amount)
    }

    pub fn refund_proposal_vote(ctx: Context<RefundProposalVote>) -> Result<()> {
        refund_proposal_vote::handler(ctx)
    }

    pub fn accept_proposal(ctx: Context<AcceptInsuranceProposal>) -> Result<()> {
        accept_proposal::handler(ctx)
    }

    pub fn refund_security(
        ctx: Context<RefundSecurity>,
        refund_amount: u64,
        security_refund_amount: u64,
    ) -> Result<()> {
        refund_security::handler(ctx, refund_amount, security_refund_amount)
    }

    pub fn transfer_to_security(ctx: Context<TransferToSecurity>) -> Result<()> {
        transfer_to_security::handler(ctx)
    }
}
