// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var booking_pb = require('./booking_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');
var google_api_annotations_pb = require('./google/api/annotations_pb.js');

function serialize_booking_BookingReply(arg) {
  if (!(arg instanceof booking_pb.BookingReply)) {
    throw new Error('Expected argument of type booking.BookingReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_booking_BookingReply(buffer_arg) {
  return booking_pb.BookingReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_booking_BookingRequest(arg) {
  if (!(arg instanceof booking_pb.BookingRequest)) {
    throw new Error('Expected argument of type booking.BookingRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_booking_BookingRequest(buffer_arg) {
  return booking_pb.BookingRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_booking_BookingsByUserReply(arg) {
  if (!(arg instanceof booking_pb.BookingsByUserReply)) {
    throw new Error('Expected argument of type booking.BookingsByUserReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_booking_BookingsByUserReply(buffer_arg) {
  return booking_pb.BookingsByUserReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_booking_BookingsByUserRequest(arg) {
  if (!(arg instanceof booking_pb.BookingsByUserRequest)) {
    throw new Error('Expected argument of type booking.BookingsByUserRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_booking_BookingsByUserRequest(buffer_arg) {
  return booking_pb.BookingsByUserRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_booking_CancelBookingReply(arg) {
  if (!(arg instanceof booking_pb.CancelBookingReply)) {
    throw new Error('Expected argument of type booking.CancelBookingReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_booking_CancelBookingReply(buffer_arg) {
  return booking_pb.CancelBookingReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_booking_CancelBookingRequest(arg) {
  if (!(arg instanceof booking_pb.CancelBookingRequest)) {
    throw new Error('Expected argument of type booking.CancelBookingRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_booking_CancelBookingRequest(buffer_arg) {
  return booking_pb.CancelBookingRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var GrpcBookingServiceService = exports.GrpcBookingServiceService = {
  bookParkingSlot: {
    path: '/booking.GrpcBookingService/BookParkingSlot',
    requestStream: false,
    responseStream: false,
    requestType: booking_pb.BookingRequest,
    responseType: booking_pb.BookingReply,
    requestSerialize: serialize_booking_BookingRequest,
    requestDeserialize: deserialize_booking_BookingRequest,
    responseSerialize: serialize_booking_BookingReply,
    responseDeserialize: deserialize_booking_BookingReply,
  },
  cancelBooking: {
    path: '/booking.GrpcBookingService/CancelBooking',
    requestStream: false,
    responseStream: false,
    requestType: booking_pb.CancelBookingRequest,
    responseType: booking_pb.CancelBookingReply,
    requestSerialize: serialize_booking_CancelBookingRequest,
    requestDeserialize: deserialize_booking_CancelBookingRequest,
    responseSerialize: serialize_booking_CancelBookingReply,
    responseDeserialize: deserialize_booking_CancelBookingReply,
  },
  getActiveBookingsByUser: {
    path: '/booking.GrpcBookingService/GetActiveBookingsByUser',
    requestStream: false,
    responseStream: false,
    requestType: booking_pb.BookingsByUserRequest,
    responseType: booking_pb.BookingsByUserReply,
    requestSerialize: serialize_booking_BookingsByUserRequest,
    requestDeserialize: deserialize_booking_BookingsByUserRequest,
    responseSerialize: serialize_booking_BookingsByUserReply,
    responseDeserialize: deserialize_booking_BookingsByUserReply,
  },
};

exports.GrpcBookingServiceClient = grpc.makeGenericClientConstructor(GrpcBookingServiceService);
