use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct Insurer {
    pub bump: u8,
    pub insurance_creator: Pubkey,
    #[max_len(100)]
    pub verifying_documents: String,
}

#[account]
#[derive(InitSpace)]
pub struct Insurance {
    pub bump: u8,
    #[max_len(50)]
    pub insurance_id: String,
    pub insurer: Pubkey,
    pub coverage: u64,
    pub premium: u64,
    pub minimum_commission: i64,
    pub deductible: u64,
    pub expiry: i64,
    #[max_len(100)]
    pub metadata_link: String,
    pub reinsured: bool,
    pub premium_due: Option<i64>,
}

#[account]
#[derive(InitSpace)]
pub struct LP {
    pub bump: u8,
    pub lp_creator: Pubkey,
    #[max_len(20)]
    pub insures: Vec<Pubkey>,
    pub total_securitized: u64,
    pub total_assets: u64,
    pub max_undercollaterization_promised: u64,
    #[max_len(20)]
    pub undercollaterization_promised: Vec<u64>,
    pub ideal_size: u64,
    pub pool_lifecycle: i64,
}

#[account]
#[derive(InitSpace)]
pub struct ReInsuranceProposal {
    pub bump: u8,
    pub lp_owner: Pubkey,
    pub proposed_commision: u64,
    pub proposed_undercollaterization: u64,
    pub insurance: Pubkey,
    #[max_len(64)]
    pub proposal_docs: String,
    #[max_len(32)]
    pub proposal_id: String,
    pub proposal_accepted: bool,
    pub proposal_sent: bool,
    pub proposal_vote: u64,
    pub proposal_vote_start: i64,
}

#[account]
#[derive(InitSpace)]
pub struct ReInsuranceVoteAccount {
    pub bump: u8,
}

#[account]
#[derive(InitSpace)]
pub struct PremiumVault {
    pub bump: u8,
    pub reinsurance: Pubkey,
}

#[account]
#[derive(InitSpace)]
pub struct StrategyAccount {
    pub bump: u8,
    pub strategy_program: Pubkey,
    pub stream_amount: u64,
    pub last_stream_payment: Option<i64>,
    pub stream_every: i64,
    pub number_of_streams: u64,
    #[max_len(50)]
    pub strategy_id: String,
    pub premium_vault: Pubkey,
    pub vote: u64,
    pub voting_start: Option<i64>,
    pub strategy_accepted: bool,
    pub strategy_blocked: bool,
}

#[account]
#[derive(InitSpace)]
pub struct StrategyVoteAccount {
    pub bump: u8,
}

#[account]
#[derive(InitSpace)]
pub struct Claim {
    pub bump: u8,
    pub reinsurance: Pubkey,
    #[max_len(50)]
    pub claim_id: String,
    pub claim_amount: u64,
    #[max_len(100)]
    pub claim_metadata_link: String,
    pub claim_voting_start: i64,
    pub vote_for: u64,
    pub vote_against: u64,
    pub accepted: Option<bool>,
    pub claimed: bool,
}

#[account]
#[derive(InitSpace)]
pub struct ClaimVoteAccount {
    pub bump: u8,
    pub vote_amount: u64,
    pub voted_for: bool,
}
