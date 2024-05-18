/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as web3 from "@solana/web3.js";
import * as beet from "@metaplex-foundation/beet";
import * as beetSolana from "@metaplex-foundation/beet-solana";

/**
 * Arguments used to create {@link LP}
 * @category Accounts
 * @category generated
 */
export type LPArgs = {
  bump: number;
  lpCreator: web3.PublicKey;
  insures: web3.PublicKey[];
  totalSecuritized: beet.bignum;
  totalAssets: beet.bignum;
  maxUndercollaterizationPromised: beet.bignum;
  undercollaterizationPromised: beet.bignum[];
  idealSize: beet.bignum;
  poolLifecycle: beet.bignum;
};

export const lPDiscriminator = [31, 47, 62, 188, 110, 128, 12, 82];
/**
 * Holds the data for the {@link LP} Account and provides de/serialization
 * functionality for that data
 *
 * @category Accounts
 * @category generated
 */
export class LP implements LPArgs {
  private constructor(
    readonly bump: number,
    readonly lpCreator: web3.PublicKey,
    readonly insures: web3.PublicKey[],
    readonly totalSecuritized: beet.bignum,
    readonly totalAssets: beet.bignum,
    readonly maxUndercollaterizationPromised: beet.bignum,
    readonly undercollaterizationPromised: beet.bignum[],
    readonly idealSize: beet.bignum,
    readonly poolLifecycle: beet.bignum
  ) {}

  /**
   * Creates a {@link LP} instance from the provided args.
   */
  static fromArgs(args: LPArgs) {
    return new LP(
      args.bump,
      args.lpCreator,
      args.insures,
      args.totalSecuritized,
      args.totalAssets,
      args.maxUndercollaterizationPromised,
      args.undercollaterizationPromised,
      args.idealSize,
      args.poolLifecycle
    );
  }

  /**
   * Deserializes the {@link LP} from the data of the provided {@link web3.AccountInfo}.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */
  static fromAccountInfo(
    accountInfo: web3.AccountInfo<Buffer>,
    offset = 0
  ): [LP, number] {
    return LP.deserialize(accountInfo.data, offset);
  }

  /**
   * Retrieves the account info from the provided address and deserializes
   * the {@link LP} from its data.
   *
   * @throws Error if no account info is found at the address or if deserialization fails
   */
  static async fromAccountAddress(
    connection: web3.Connection,
    address: web3.PublicKey,
    commitmentOrConfig?: web3.Commitment | web3.GetAccountInfoConfig
  ): Promise<LP> {
    const accountInfo = await connection.getAccountInfo(
      address,
      commitmentOrConfig
    );
    if (accountInfo == null) {
      throw new Error(`Unable to find LP account at ${address}`);
    }
    return LP.fromAccountInfo(accountInfo, 0)[0];
  }

  /**
   * Provides a {@link web3.Connection.getProgramAccounts} config builder,
   * to fetch accounts matching filters that can be specified via that builder.
   *
   * @param programId - the program that owns the accounts we are filtering
   */
  static gpaBuilder(
    programId: web3.PublicKey = new web3.PublicKey(
      "DajsLYULhHh3SVSDHsCCvnuHD8JeXgVf5mjfnQWpwzix"
    )
  ) {
    return beetSolana.GpaBuilder.fromStruct(programId, lPBeet);
  }

  /**
   * Deserializes the {@link LP} from the provided data Buffer.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */
  static deserialize(buf: Buffer, offset = 0): [LP, number] {
    return lPBeet.deserialize(buf, offset);
  }

  /**
   * Serializes the {@link LP} into a Buffer.
   * @returns a tuple of the created Buffer and the offset up to which the buffer was written to store it.
   */
  serialize(): [Buffer, number] {
    return lPBeet.serialize({
      accountDiscriminator: lPDiscriminator,
      ...this,
    });
  }

  /**
   * Returns the byteSize of a {@link Buffer} holding the serialized data of
   * {@link LP} for the provided args.
   *
   * @param args need to be provided since the byte size for this account
   * depends on them
   */
  static byteSize(args: LPArgs) {
    const instance = LP.fromArgs(args);
    return lPBeet.toFixedFromValue({
      accountDiscriminator: lPDiscriminator,
      ...instance,
    }).byteSize;
  }

  /**
   * Fetches the minimum balance needed to exempt an account holding
   * {@link LP} data from rent
   *
   * @param args need to be provided since the byte size for this account
   * depends on them
   * @param connection used to retrieve the rent exemption information
   */
  static async getMinimumBalanceForRentExemption(
    args: LPArgs,
    connection: web3.Connection,
    commitment?: web3.Commitment
  ): Promise<number> {
    return connection.getMinimumBalanceForRentExemption(
      LP.byteSize(args),
      commitment
    );
  }

  /**
   * Returns a readable version of {@link LP} properties
   * and can be used to convert to JSON and/or logging
   */
  pretty() {
    return {
      bump: this.bump,
      lpCreator: this.lpCreator.toBase58(),
      insures: this.insures,
      totalSecuritized: (() => {
        const x = <{ toNumber: () => number }>this.totalSecuritized;
        if (typeof x.toNumber === "function") {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      })(),
      totalAssets: (() => {
        const x = <{ toNumber: () => number }>this.totalAssets;
        if (typeof x.toNumber === "function") {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      })(),
      maxUndercollaterizationPromised: (() => {
        const x = <{ toNumber: () => number }>(
          this.maxUndercollaterizationPromised
        );
        if (typeof x.toNumber === "function") {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      })(),
      undercollaterizationPromised: this.undercollaterizationPromised,
      idealSize: (() => {
        const x = <{ toNumber: () => number }>this.idealSize;
        if (typeof x.toNumber === "function") {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      })(),
      poolLifecycle: (() => {
        const x = <{ toNumber: () => number }>this.poolLifecycle;
        if (typeof x.toNumber === "function") {
          try {
            return x.toNumber();
          } catch (_) {
            return x;
          }
        }
        return x;
      })(),
    };
  }
}

/**
 * @category Accounts
 * @category generated
 */
export const lPBeet = new beet.FixableBeetStruct<
  LP,
  LPArgs & {
    accountDiscriminator: number[] /* size: 8 */;
  }
>(
  [
    ["accountDiscriminator", beet.uniformFixedSizeArray(beet.u8, 8)],
    ["bump", beet.u8],
    ["lpCreator", beetSolana.publicKey],
    ["insures", beet.array(beetSolana.publicKey)],
    ["totalSecuritized", beet.u64],
    ["totalAssets", beet.u64],
    ["maxUndercollaterizationPromised", beet.u64],
    ["undercollaterizationPromised", beet.array(beet.u64)],
    ["idealSize", beet.u64],
    ["poolLifecycle", beet.i64],
  ],
  LP.fromArgs,
  "LP"
);