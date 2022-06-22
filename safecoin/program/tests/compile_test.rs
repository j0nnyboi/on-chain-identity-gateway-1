#![allow(dead_code)]

use borsh::{BorshDeserialize, BorshSchema, BorshSerialize};
use safecoin_program::pubkey::Pubkey;

#[derive(BorshDeserialize, BorshSerialize, BorshSchema)]
struct CheckBorsh {
    key: Pubkey,
}
