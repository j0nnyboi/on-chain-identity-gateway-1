//! SOL program
#![deny(missing_docs)]

extern crate core;

mod entrypoint;
pub mod error;
pub mod processor;
pub mod state;

// Export current SDK types for downstream users building with a different SDK version
pub use safecoin_program;

safecoin_program::declare_id!("gatem74V238djXdzWnJf94Wo1DcnuGkfijbf3AuBhfs");
