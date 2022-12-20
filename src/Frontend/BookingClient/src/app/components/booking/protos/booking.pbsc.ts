/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
//
// THIS IS A GENERATED FILE
// DO NOT MODIFY IT! YOUR CHANGES WILL BE LOST
import { Inject, Injectable, Optional } from '@angular/core';
import {
  GrpcCallType,
  GrpcClient,
  GrpcClientFactory,
  GrpcEvent,
  GrpcMetadata
} from '@ngx-grpc/common';
import {
  GRPC_CLIENT_FACTORY,
  GrpcHandler,
  takeMessages,
  throwStatusErrors
} from '@ngx-grpc/core';
import { Observable } from 'rxjs';
import * as thisProto from './booking.pb';
import * as googleApi000 from './google/api/http.pb';
import * as googleProtobuf001 from '@ngx-grpc/well-known-types';
import * as googleProtobuf002 from '@ngx-grpc/well-known-types';
import * as googleApi003 from './google/api/annotations.pb';
import { GRPC_GRPC_BOOKING_SERVICE_CLIENT_SETTINGS } from './booking.pbconf';
/**
 * Service client implementation for booking.GrpcBookingService
 */
@Injectable({ providedIn: 'any' })
export class GrpcBookingServiceClient {
  private client: GrpcClient<any>;

  /**
   * Raw RPC implementation for each service client method.
   * The raw methods provide more control on the incoming data and events. E.g. they can be useful to read status `OK` metadata.
   * Attention: these methods do not throw errors when non-zero status codes are received.
   */
  $raw = {
    /**
     * Unary call: /booking.GrpcBookingService/BookParkingSlot
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.BookingReply>>
     */
    bookParkingSlot: (
      requestData: thisProto.BookingRequest,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<thisProto.BookingReply>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/booking.GrpcBookingService/BookParkingSlot',
        requestData,
        requestMetadata,
        requestClass: thisProto.BookingRequest,
        responseClass: thisProto.BookingReply
      });
    },
    /**
     * Unary call: /booking.GrpcBookingService/CancelBooking
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.CancelBookingReply>>
     */
    cancelBooking: (
      requestData: thisProto.CancelBookingRequest,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<thisProto.CancelBookingReply>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/booking.GrpcBookingService/CancelBooking',
        requestData,
        requestMetadata,
        requestClass: thisProto.CancelBookingRequest,
        responseClass: thisProto.CancelBookingReply
      });
    },
    /**
     * Unary call: /booking.GrpcBookingService/GetActiveBookingsByUser
     *
     * @param requestMessage Request message
     * @param requestMetadata Request metadata
     * @returns Observable<GrpcEvent<thisProto.BookingsByUserReply>>
     */
    getActiveBookingsByUser: (
      requestData: thisProto.BookingsByUserRequest,
      requestMetadata = new GrpcMetadata()
    ): Observable<GrpcEvent<thisProto.BookingsByUserReply>> => {
      return this.handler.handle({
        type: GrpcCallType.unary,
        client: this.client,
        path: '/booking.GrpcBookingService/GetActiveBookingsByUser',
        requestData,
        requestMetadata,
        requestClass: thisProto.BookingsByUserRequest,
        responseClass: thisProto.BookingsByUserReply
      });
    }
  };

  constructor(
    @Optional()
    @Inject(GRPC_GRPC_BOOKING_SERVICE_CLIENT_SETTINGS)
    settings: any,
    @Inject(GRPC_CLIENT_FACTORY) clientFactory: GrpcClientFactory<any>,
    private handler: GrpcHandler
  ) {
    this.client = clientFactory.createClient(
      'booking.GrpcBookingService',
      settings
    );
  }

  /**
   * Unary call @/booking.GrpcBookingService/BookParkingSlot
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.BookingReply>
   */
  bookParkingSlot(
    requestData: thisProto.BookingRequest,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.BookingReply> {
    return this.$raw
      .bookParkingSlot(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary call @/booking.GrpcBookingService/CancelBooking
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.CancelBookingReply>
   */
  cancelBooking(
    requestData: thisProto.CancelBookingRequest,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.CancelBookingReply> {
    return this.$raw
      .cancelBooking(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }

  /**
   * Unary call @/booking.GrpcBookingService/GetActiveBookingsByUser
   *
   * @param requestMessage Request message
   * @param requestMetadata Request metadata
   * @returns Observable<thisProto.BookingsByUserReply>
   */
  getActiveBookingsByUser(
    requestData: thisProto.BookingsByUserRequest,
    requestMetadata = new GrpcMetadata()
  ): Observable<thisProto.BookingsByUserReply> {
    return this.$raw
      .getActiveBookingsByUser(requestData, requestMetadata)
      .pipe(throwStatusErrors(), takeMessages());
  }
}
