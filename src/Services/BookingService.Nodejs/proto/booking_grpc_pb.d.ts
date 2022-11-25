// package: booking
// file: booking.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as booking_pb from "./booking_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";

interface IGrpcBookingServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    bookParkingSlot: IGrpcBookingServiceService_IBookParkingSlot;
    cancelBooking: IGrpcBookingServiceService_ICancelBooking;
    getActiveBookingsByUser: IGrpcBookingServiceService_IGetActiveBookingsByUser;
}

interface IGrpcBookingServiceService_IBookParkingSlot extends grpc.MethodDefinition<booking_pb.BookingRequest, booking_pb.BookingReply> {
    path: "/booking.GrpcBookingService/BookParkingSlot";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<booking_pb.BookingRequest>;
    requestDeserialize: grpc.deserialize<booking_pb.BookingRequest>;
    responseSerialize: grpc.serialize<booking_pb.BookingReply>;
    responseDeserialize: grpc.deserialize<booking_pb.BookingReply>;
}
interface IGrpcBookingServiceService_ICancelBooking extends grpc.MethodDefinition<booking_pb.CancelBookingRequest, booking_pb.CancelBookingReply> {
    path: "/booking.GrpcBookingService/CancelBooking";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<booking_pb.CancelBookingRequest>;
    requestDeserialize: grpc.deserialize<booking_pb.CancelBookingRequest>;
    responseSerialize: grpc.serialize<booking_pb.CancelBookingReply>;
    responseDeserialize: grpc.deserialize<booking_pb.CancelBookingReply>;
}
interface IGrpcBookingServiceService_IGetActiveBookingsByUser extends grpc.MethodDefinition<booking_pb.BookingsByUserRequest, booking_pb.BookingsByUserReply> {
    path: "/booking.GrpcBookingService/GetActiveBookingsByUser";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<booking_pb.BookingsByUserRequest>;
    requestDeserialize: grpc.deserialize<booking_pb.BookingsByUserRequest>;
    responseSerialize: grpc.serialize<booking_pb.BookingsByUserReply>;
    responseDeserialize: grpc.deserialize<booking_pb.BookingsByUserReply>;
}

export const GrpcBookingServiceService: IGrpcBookingServiceService;

export interface IGrpcBookingServiceServer extends grpc.UntypedServiceImplementation {
    bookParkingSlot: grpc.handleUnaryCall<booking_pb.BookingRequest, booking_pb.BookingReply>;
    cancelBooking: grpc.handleUnaryCall<booking_pb.CancelBookingRequest, booking_pb.CancelBookingReply>;
    getActiveBookingsByUser: grpc.handleUnaryCall<booking_pb.BookingsByUserRequest, booking_pb.BookingsByUserReply>;
}

export interface IGrpcBookingServiceClient {
    bookParkingSlot(request: booking_pb.BookingRequest, callback: (error: grpc.ServiceError | null, response: booking_pb.BookingReply) => void): grpc.ClientUnaryCall;
    bookParkingSlot(request: booking_pb.BookingRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: booking_pb.BookingReply) => void): grpc.ClientUnaryCall;
    bookParkingSlot(request: booking_pb.BookingRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: booking_pb.BookingReply) => void): grpc.ClientUnaryCall;
    cancelBooking(request: booking_pb.CancelBookingRequest, callback: (error: grpc.ServiceError | null, response: booking_pb.CancelBookingReply) => void): grpc.ClientUnaryCall;
    cancelBooking(request: booking_pb.CancelBookingRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: booking_pb.CancelBookingReply) => void): grpc.ClientUnaryCall;
    cancelBooking(request: booking_pb.CancelBookingRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: booking_pb.CancelBookingReply) => void): grpc.ClientUnaryCall;
    getActiveBookingsByUser(request: booking_pb.BookingsByUserRequest, callback: (error: grpc.ServiceError | null, response: booking_pb.BookingsByUserReply) => void): grpc.ClientUnaryCall;
    getActiveBookingsByUser(request: booking_pb.BookingsByUserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: booking_pb.BookingsByUserReply) => void): grpc.ClientUnaryCall;
    getActiveBookingsByUser(request: booking_pb.BookingsByUserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: booking_pb.BookingsByUserReply) => void): grpc.ClientUnaryCall;
}

export class GrpcBookingServiceClient extends grpc.Client implements IGrpcBookingServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public bookParkingSlot(request: booking_pb.BookingRequest, callback: (error: grpc.ServiceError | null, response: booking_pb.BookingReply) => void): grpc.ClientUnaryCall;
    public bookParkingSlot(request: booking_pb.BookingRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: booking_pb.BookingReply) => void): grpc.ClientUnaryCall;
    public bookParkingSlot(request: booking_pb.BookingRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: booking_pb.BookingReply) => void): grpc.ClientUnaryCall;
    public cancelBooking(request: booking_pb.CancelBookingRequest, callback: (error: grpc.ServiceError | null, response: booking_pb.CancelBookingReply) => void): grpc.ClientUnaryCall;
    public cancelBooking(request: booking_pb.CancelBookingRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: booking_pb.CancelBookingReply) => void): grpc.ClientUnaryCall;
    public cancelBooking(request: booking_pb.CancelBookingRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: booking_pb.CancelBookingReply) => void): grpc.ClientUnaryCall;
    public getActiveBookingsByUser(request: booking_pb.BookingsByUserRequest, callback: (error: grpc.ServiceError | null, response: booking_pb.BookingsByUserReply) => void): grpc.ClientUnaryCall;
    public getActiveBookingsByUser(request: booking_pb.BookingsByUserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: booking_pb.BookingsByUserReply) => void): grpc.ClientUnaryCall;
    public getActiveBookingsByUser(request: booking_pb.BookingsByUserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: booking_pb.BookingsByUserReply) => void): grpc.ClientUnaryCall;
}
