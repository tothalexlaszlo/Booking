// package: booking
// file: booking.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";

export class BookingRequest extends jspb.Message { 
    getUserid(): number;
    setUserid(value: number): BookingRequest;

    hasStartdate(): boolean;
    clearStartdate(): void;
    getStartdate(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setStartdate(value?: google_protobuf_timestamp_pb.Timestamp): BookingRequest;

    hasEnddate(): boolean;
    clearEnddate(): void;
    getEnddate(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setEnddate(value?: google_protobuf_timestamp_pb.Timestamp): BookingRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BookingRequest.AsObject;
    static toObject(includeInstance: boolean, msg: BookingRequest): BookingRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BookingRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BookingRequest;
    static deserializeBinaryFromReader(message: BookingRequest, reader: jspb.BinaryReader): BookingRequest;
}

export namespace BookingRequest {
    export type AsObject = {
        userid: number,
        startdate?: google_protobuf_timestamp_pb.Timestamp.AsObject,
        enddate?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    }
}

export class BookingReply extends jspb.Message { 
    getBookingid(): number;
    setBookingid(value: number): BookingReply;
    getParkingslotname(): string;
    setParkingslotname(value: string): BookingReply;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BookingReply.AsObject;
    static toObject(includeInstance: boolean, msg: BookingReply): BookingReply.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BookingReply, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BookingReply;
    static deserializeBinaryFromReader(message: BookingReply, reader: jspb.BinaryReader): BookingReply;
}

export namespace BookingReply {
    export type AsObject = {
        bookingid: number,
        parkingslotname: string,
    }
}

export class CancelBookingRequest extends jspb.Message { 
    getBookingid(): number;
    setBookingid(value: number): CancelBookingRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CancelBookingRequest.AsObject;
    static toObject(includeInstance: boolean, msg: CancelBookingRequest): CancelBookingRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CancelBookingRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CancelBookingRequest;
    static deserializeBinaryFromReader(message: CancelBookingRequest, reader: jspb.BinaryReader): CancelBookingRequest;
}

export namespace CancelBookingRequest {
    export type AsObject = {
        bookingid: number,
    }
}

export class CancelBookingReply extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): CancelBookingReply;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CancelBookingReply.AsObject;
    static toObject(includeInstance: boolean, msg: CancelBookingReply): CancelBookingReply.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CancelBookingReply, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CancelBookingReply;
    static deserializeBinaryFromReader(message: CancelBookingReply, reader: jspb.BinaryReader): CancelBookingReply;
}

export namespace CancelBookingReply {
    export type AsObject = {
        success: boolean,
    }
}

export class BookingsByUserRequest extends jspb.Message { 
    getUserid(): number;
    setUserid(value: number): BookingsByUserRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BookingsByUserRequest.AsObject;
    static toObject(includeInstance: boolean, msg: BookingsByUserRequest): BookingsByUserRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BookingsByUserRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BookingsByUserRequest;
    static deserializeBinaryFromReader(message: BookingsByUserRequest, reader: jspb.BinaryReader): BookingsByUserRequest;
}

export namespace BookingsByUserRequest {
    export type AsObject = {
        userid: number,
    }
}

export class BookingsByUserReply extends jspb.Message { 
    clearBookingsbyuserList(): void;
    getBookingsbyuserList(): Array<BookingsByUserReply.BookingByUser>;
    setBookingsbyuserList(value: Array<BookingsByUserReply.BookingByUser>): BookingsByUserReply;
    addBookingsbyuser(value?: BookingsByUserReply.BookingByUser, index?: number): BookingsByUserReply.BookingByUser;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BookingsByUserReply.AsObject;
    static toObject(includeInstance: boolean, msg: BookingsByUserReply): BookingsByUserReply.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BookingsByUserReply, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BookingsByUserReply;
    static deserializeBinaryFromReader(message: BookingsByUserReply, reader: jspb.BinaryReader): BookingsByUserReply;
}

export namespace BookingsByUserReply {
    export type AsObject = {
        bookingsbyuserList: Array<BookingsByUserReply.BookingByUser.AsObject>,
    }


    export class BookingByUser extends jspb.Message { 
        getParkingslotname(): string;
        setParkingslotname(value: string): BookingByUser;

        hasStartdate(): boolean;
        clearStartdate(): void;
        getStartdate(): google_protobuf_timestamp_pb.Timestamp | undefined;
        setStartdate(value?: google_protobuf_timestamp_pb.Timestamp): BookingByUser;

        hasEnddate(): boolean;
        clearEnddate(): void;
        getEnddate(): google_protobuf_timestamp_pb.Timestamp | undefined;
        setEnddate(value?: google_protobuf_timestamp_pb.Timestamp): BookingByUser;

        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): BookingByUser.AsObject;
        static toObject(includeInstance: boolean, msg: BookingByUser): BookingByUser.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: BookingByUser, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): BookingByUser;
        static deserializeBinaryFromReader(message: BookingByUser, reader: jspb.BinaryReader): BookingByUser;
    }

    export namespace BookingByUser {
        export type AsObject = {
            parkingslotname: string,
            startdate?: google_protobuf_timestamp_pb.Timestamp.AsObject,
            enddate?: google_protobuf_timestamp_pb.Timestamp.AsObject,
        }
    }

}
