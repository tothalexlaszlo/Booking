/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
//
// THIS IS A GENERATED FILE
// DO NOT MODIFY IT! YOUR CHANGES WILL BE LOST
import {
  GrpcMessage,
  RecursivePartial,
  ToProtobufJSONOptions
} from '@ngx-grpc/common';
import { BinaryReader, BinaryWriter, ByteSource } from 'google-protobuf';
import * as googleApi000 from './google/api/http.pb';
import * as googleProtobuf001 from '@ngx-grpc/well-known-types';
import * as googleProtobuf002 from '@ngx-grpc/well-known-types';
import * as googleApi003 from './google/api/annotations.pb';
/**
 * Message implementation for booking.BookingRequest
 */
export class BookingRequest implements GrpcMessage {
  static id = 'booking.BookingRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new BookingRequest();
    BookingRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: BookingRequest) {
    _instance.userId = _instance.userId || '';
    _instance.startDate = _instance.startDate || undefined;
    _instance.endDate = _instance.endDate || undefined;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: BookingRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.userId = _reader.readString();
          break;
        case 2:
          _instance.startDate = new googleProtobuf002.Timestamp();
          _reader.readMessage(
            _instance.startDate,
            googleProtobuf002.Timestamp.deserializeBinaryFromReader
          );
          break;
        case 3:
          _instance.endDate = new googleProtobuf002.Timestamp();
          _reader.readMessage(
            _instance.endDate,
            googleProtobuf002.Timestamp.deserializeBinaryFromReader
          );
          break;
        default:
          _reader.skipField();
      }
    }

    BookingRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: BookingRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.userId) {
      _writer.writeString(1, _instance.userId);
    }
    if (_instance.startDate) {
      _writer.writeMessage(
        2,
        _instance.startDate as any,
        googleProtobuf002.Timestamp.serializeBinaryToWriter
      );
    }
    if (_instance.endDate) {
      _writer.writeMessage(
        3,
        _instance.endDate as any,
        googleProtobuf002.Timestamp.serializeBinaryToWriter
      );
    }
  }

  private _userId: string;
  private _startDate?: googleProtobuf002.Timestamp;
  private _endDate?: googleProtobuf002.Timestamp;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of BookingRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<BookingRequest.AsObject>) {
    _value = _value || {};
    this.userId = _value.userId;
    this.startDate = _value.startDate
      ? new googleProtobuf002.Timestamp(_value.startDate)
      : undefined;
    this.endDate = _value.endDate
      ? new googleProtobuf002.Timestamp(_value.endDate)
      : undefined;
    BookingRequest.refineValues(this);
  }
  get userId(): string {
    return this._userId;
  }
  set userId(value: string) {
    this._userId = value;
  }
  get startDate(): googleProtobuf002.Timestamp | undefined {
    return this._startDate;
  }
  set startDate(value: googleProtobuf002.Timestamp | undefined) {
    this._startDate = value;
  }
  get endDate(): googleProtobuf002.Timestamp | undefined {
    return this._endDate;
  }
  set endDate(value: googleProtobuf002.Timestamp | undefined) {
    this._endDate = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    BookingRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): BookingRequest.AsObject {
    return {
      userId: this.userId,
      startDate: this.startDate ? this.startDate.toObject() : undefined,
      endDate: this.endDate ? this.endDate.toObject() : undefined
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): BookingRequest.AsProtobufJSON {
    return {
      userId: this.userId,
      startDate: this.startDate ? this.startDate.toProtobufJSON(options) : null,
      endDate: this.endDate ? this.endDate.toProtobufJSON(options) : null
    };
  }
}
export module BookingRequest {
  /**
   * Standard JavaScript object representation for BookingRequest
   */
  export interface AsObject {
    userId: string;
    startDate?: googleProtobuf002.Timestamp.AsObject;
    endDate?: googleProtobuf002.Timestamp.AsObject;
  }

  /**
   * Protobuf JSON representation for BookingRequest
   */
  export interface AsProtobufJSON {
    userId: string;
    startDate: googleProtobuf002.Timestamp.AsProtobufJSON | null;
    endDate: googleProtobuf002.Timestamp.AsProtobufJSON | null;
  }
}

/**
 * Message implementation for booking.BookingReply
 */
export class BookingReply implements GrpcMessage {
  static id = 'booking.BookingReply';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new BookingReply();
    BookingReply.deserializeBinaryFromReader(instance, new BinaryReader(bytes));
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: BookingReply) {
    _instance.bookingId = _instance.bookingId || 0;
    _instance.parkingSlotName = _instance.parkingSlotName || '';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: BookingReply,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.bookingId = _reader.readInt32();
          break;
        case 2:
          _instance.parkingSlotName = _reader.readString();
          break;
        default:
          _reader.skipField();
      }
    }

    BookingReply.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: BookingReply,
    _writer: BinaryWriter
  ) {
    if (_instance.bookingId) {
      _writer.writeInt32(1, _instance.bookingId);
    }
    if (_instance.parkingSlotName) {
      _writer.writeString(2, _instance.parkingSlotName);
    }
  }

  private _bookingId: number;
  private _parkingSlotName: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of BookingReply to deeply clone from
   */
  constructor(_value?: RecursivePartial<BookingReply.AsObject>) {
    _value = _value || {};
    this.bookingId = _value.bookingId;
    this.parkingSlotName = _value.parkingSlotName;
    BookingReply.refineValues(this);
  }
  get bookingId(): number {
    return this._bookingId;
  }
  set bookingId(value: number) {
    this._bookingId = value;
  }
  get parkingSlotName(): string {
    return this._parkingSlotName;
  }
  set parkingSlotName(value: string) {
    this._parkingSlotName = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    BookingReply.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): BookingReply.AsObject {
    return {
      bookingId: this.bookingId,
      parkingSlotName: this.parkingSlotName
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): BookingReply.AsProtobufJSON {
    return {
      bookingId: this.bookingId,
      parkingSlotName: this.parkingSlotName
    };
  }
}
export module BookingReply {
  /**
   * Standard JavaScript object representation for BookingReply
   */
  export interface AsObject {
    bookingId: number;
    parkingSlotName: string;
  }

  /**
   * Protobuf JSON representation for BookingReply
   */
  export interface AsProtobufJSON {
    bookingId: number;
    parkingSlotName: string;
  }
}

/**
 * Message implementation for booking.CancelBookingRequest
 */
export class CancelBookingRequest implements GrpcMessage {
  static id = 'booking.CancelBookingRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new CancelBookingRequest();
    CancelBookingRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: CancelBookingRequest) {
    _instance.bookingId = _instance.bookingId || 0;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: CancelBookingRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.bookingId = _reader.readInt32();
          break;
        default:
          _reader.skipField();
      }
    }

    CancelBookingRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: CancelBookingRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.bookingId) {
      _writer.writeInt32(1, _instance.bookingId);
    }
  }

  private _bookingId: number;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of CancelBookingRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<CancelBookingRequest.AsObject>) {
    _value = _value || {};
    this.bookingId = _value.bookingId;
    CancelBookingRequest.refineValues(this);
  }
  get bookingId(): number {
    return this._bookingId;
  }
  set bookingId(value: number) {
    this._bookingId = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    CancelBookingRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): CancelBookingRequest.AsObject {
    return {
      bookingId: this.bookingId
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): CancelBookingRequest.AsProtobufJSON {
    return {
      bookingId: this.bookingId
    };
  }
}
export module CancelBookingRequest {
  /**
   * Standard JavaScript object representation for CancelBookingRequest
   */
  export interface AsObject {
    bookingId: number;
  }

  /**
   * Protobuf JSON representation for CancelBookingRequest
   */
  export interface AsProtobufJSON {
    bookingId: number;
  }
}

/**
 * Message implementation for booking.CancelBookingReply
 */
export class CancelBookingReply implements GrpcMessage {
  static id = 'booking.CancelBookingReply';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new CancelBookingReply();
    CancelBookingReply.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: CancelBookingReply) {
    _instance.success = _instance.success || false;
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: CancelBookingReply,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.success = _reader.readBool();
          break;
        default:
          _reader.skipField();
      }
    }

    CancelBookingReply.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: CancelBookingReply,
    _writer: BinaryWriter
  ) {
    if (_instance.success) {
      _writer.writeBool(1, _instance.success);
    }
  }

  private _success: boolean;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of CancelBookingReply to deeply clone from
   */
  constructor(_value?: RecursivePartial<CancelBookingReply.AsObject>) {
    _value = _value || {};
    this.success = _value.success;
    CancelBookingReply.refineValues(this);
  }
  get success(): boolean {
    return this._success;
  }
  set success(value: boolean) {
    this._success = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    CancelBookingReply.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): CancelBookingReply.AsObject {
    return {
      success: this.success
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): CancelBookingReply.AsProtobufJSON {
    return {
      success: this.success
    };
  }
}
export module CancelBookingReply {
  /**
   * Standard JavaScript object representation for CancelBookingReply
   */
  export interface AsObject {
    success: boolean;
  }

  /**
   * Protobuf JSON representation for CancelBookingReply
   */
  export interface AsProtobufJSON {
    success: boolean;
  }
}

/**
 * Message implementation for booking.BookingsByUserRequest
 */
export class BookingsByUserRequest implements GrpcMessage {
  static id = 'booking.BookingsByUserRequest';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new BookingsByUserRequest();
    BookingsByUserRequest.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: BookingsByUserRequest) {
    _instance.userId = _instance.userId || '';
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: BookingsByUserRequest,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          _instance.userId = _reader.readString();
          break;
        default:
          _reader.skipField();
      }
    }

    BookingsByUserRequest.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: BookingsByUserRequest,
    _writer: BinaryWriter
  ) {
    if (_instance.userId) {
      _writer.writeString(1, _instance.userId);
    }
  }

  private _userId: string;

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of BookingsByUserRequest to deeply clone from
   */
  constructor(_value?: RecursivePartial<BookingsByUserRequest.AsObject>) {
    _value = _value || {};
    this.userId = _value.userId;
    BookingsByUserRequest.refineValues(this);
  }
  get userId(): string {
    return this._userId;
  }
  set userId(value: string) {
    this._userId = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    BookingsByUserRequest.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): BookingsByUserRequest.AsObject {
    return {
      userId: this.userId
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): BookingsByUserRequest.AsProtobufJSON {
    return {
      userId: this.userId
    };
  }
}
export module BookingsByUserRequest {
  /**
   * Standard JavaScript object representation for BookingsByUserRequest
   */
  export interface AsObject {
    userId: string;
  }

  /**
   * Protobuf JSON representation for BookingsByUserRequest
   */
  export interface AsProtobufJSON {
    userId: string;
  }
}

/**
 * Message implementation for booking.BookingsByUserReply
 */
export class BookingsByUserReply implements GrpcMessage {
  static id = 'booking.BookingsByUserReply';

  /**
   * Deserialize binary data to message
   * @param instance message instance
   */
  static deserializeBinary(bytes: ByteSource) {
    const instance = new BookingsByUserReply();
    BookingsByUserReply.deserializeBinaryFromReader(
      instance,
      new BinaryReader(bytes)
    );
    return instance;
  }

  /**
   * Check all the properties and set default protobuf values if necessary
   * @param _instance message instance
   */
  static refineValues(_instance: BookingsByUserReply) {
    _instance.bookingsByUser = _instance.bookingsByUser || [];
  }

  /**
   * Deserializes / reads binary message into message instance using provided binary reader
   * @param _instance message instance
   * @param _reader binary reader instance
   */
  static deserializeBinaryFromReader(
    _instance: BookingsByUserReply,
    _reader: BinaryReader
  ) {
    while (_reader.nextField()) {
      if (_reader.isEndGroup()) break;

      switch (_reader.getFieldNumber()) {
        case 1:
          const messageInitializer1 = new BookingsByUserReply.BookingByUser();
          _reader.readMessage(
            messageInitializer1,
            BookingsByUserReply.BookingByUser.deserializeBinaryFromReader
          );
          (_instance.bookingsByUser = _instance.bookingsByUser || []).push(
            messageInitializer1
          );
          break;
        default:
          _reader.skipField();
      }
    }

    BookingsByUserReply.refineValues(_instance);
  }

  /**
   * Serializes a message to binary format using provided binary reader
   * @param _instance message instance
   * @param _writer binary writer instance
   */
  static serializeBinaryToWriter(
    _instance: BookingsByUserReply,
    _writer: BinaryWriter
  ) {
    if (_instance.bookingsByUser && _instance.bookingsByUser.length) {
      _writer.writeRepeatedMessage(
        1,
        _instance.bookingsByUser as any,
        BookingsByUserReply.BookingByUser.serializeBinaryToWriter
      );
    }
  }

  private _bookingsByUser?: BookingsByUserReply.BookingByUser[];

  /**
   * Message constructor. Initializes the properties and applies default Protobuf values if necessary
   * @param _value initial values object or instance of BookingsByUserReply to deeply clone from
   */
  constructor(_value?: RecursivePartial<BookingsByUserReply.AsObject>) {
    _value = _value || {};
    this.bookingsByUser = (_value.bookingsByUser || []).map(
      m => new BookingsByUserReply.BookingByUser(m)
    );
    BookingsByUserReply.refineValues(this);
  }
  get bookingsByUser(): BookingsByUserReply.BookingByUser[] | undefined {
    return this._bookingsByUser;
  }
  set bookingsByUser(value: BookingsByUserReply.BookingByUser[] | undefined) {
    this._bookingsByUser = value;
  }

  /**
   * Serialize message to binary data
   * @param instance message instance
   */
  serializeBinary() {
    const writer = new BinaryWriter();
    BookingsByUserReply.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  }

  /**
   * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
   */
  toObject(): BookingsByUserReply.AsObject {
    return {
      bookingsByUser: (this.bookingsByUser || []).map(m => m.toObject())
    };
  }

  /**
   * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
   */
  toJSON() {
    return this.toObject();
  }

  /**
   * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
   * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
   * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
   */
  toProtobufJSON(
    // @ts-ignore
    options?: ToProtobufJSONOptions
  ): BookingsByUserReply.AsProtobufJSON {
    return {
      bookingsByUser: (this.bookingsByUser || []).map(m =>
        m.toProtobufJSON(options)
      )
    };
  }
}
export module BookingsByUserReply {
  /**
   * Standard JavaScript object representation for BookingsByUserReply
   */
  export interface AsObject {
    bookingsByUser?: BookingsByUserReply.BookingByUser.AsObject[];
  }

  /**
   * Protobuf JSON representation for BookingsByUserReply
   */
  export interface AsProtobufJSON {
    bookingsByUser: BookingsByUserReply.BookingByUser.AsProtobufJSON[] | null;
  }

  /**
   * Message implementation for booking.BookingsByUserReply.BookingByUser
   */
  export class BookingByUser implements GrpcMessage {
    static id = 'booking.BookingsByUserReply.BookingByUser';

    /**
     * Deserialize binary data to message
     * @param instance message instance
     */
    static deserializeBinary(bytes: ByteSource) {
      const instance = new BookingByUser();
      BookingByUser.deserializeBinaryFromReader(
        instance,
        new BinaryReader(bytes)
      );
      return instance;
    }

    /**
     * Check all the properties and set default protobuf values if necessary
     * @param _instance message instance
     */
    static refineValues(_instance: BookingByUser) {
      _instance.bookingId = _instance.bookingId || 0;
      _instance.parkingSlotName = _instance.parkingSlotName || '';
      _instance.startDate = _instance.startDate || undefined;
      _instance.endDate = _instance.endDate || undefined;
    }

    /**
     * Deserializes / reads binary message into message instance using provided binary reader
     * @param _instance message instance
     * @param _reader binary reader instance
     */
    static deserializeBinaryFromReader(
      _instance: BookingByUser,
      _reader: BinaryReader
    ) {
      while (_reader.nextField()) {
        if (_reader.isEndGroup()) break;

        switch (_reader.getFieldNumber()) {
          case 1:
            _instance.bookingId = _reader.readInt32();
            break;
          case 2:
            _instance.parkingSlotName = _reader.readString();
            break;
          case 3:
            _instance.startDate = new googleProtobuf002.Timestamp();
            _reader.readMessage(
              _instance.startDate,
              googleProtobuf002.Timestamp.deserializeBinaryFromReader
            );
            break;
          case 4:
            _instance.endDate = new googleProtobuf002.Timestamp();
            _reader.readMessage(
              _instance.endDate,
              googleProtobuf002.Timestamp.deserializeBinaryFromReader
            );
            break;
          default:
            _reader.skipField();
        }
      }

      BookingByUser.refineValues(_instance);
    }

    /**
     * Serializes a message to binary format using provided binary reader
     * @param _instance message instance
     * @param _writer binary writer instance
     */
    static serializeBinaryToWriter(
      _instance: BookingByUser,
      _writer: BinaryWriter
    ) {
      if (_instance.bookingId) {
        _writer.writeInt32(1, _instance.bookingId);
      }
      if (_instance.parkingSlotName) {
        _writer.writeString(2, _instance.parkingSlotName);
      }
      if (_instance.startDate) {
        _writer.writeMessage(
          3,
          _instance.startDate as any,
          googleProtobuf002.Timestamp.serializeBinaryToWriter
        );
      }
      if (_instance.endDate) {
        _writer.writeMessage(
          4,
          _instance.endDate as any,
          googleProtobuf002.Timestamp.serializeBinaryToWriter
        );
      }
    }

    private _bookingId: number;
    private _parkingSlotName: string;
    private _startDate?: googleProtobuf002.Timestamp;
    private _endDate?: googleProtobuf002.Timestamp;

    /**
     * Message constructor. Initializes the properties and applies default Protobuf values if necessary
     * @param _value initial values object or instance of BookingByUser to deeply clone from
     */
    constructor(_value?: RecursivePartial<BookingByUser.AsObject>) {
      _value = _value || {};
      this.bookingId = _value.bookingId;
      this.parkingSlotName = _value.parkingSlotName;
      this.startDate = _value.startDate
        ? new googleProtobuf002.Timestamp(_value.startDate)
        : undefined;
      this.endDate = _value.endDate
        ? new googleProtobuf002.Timestamp(_value.endDate)
        : undefined;
      BookingByUser.refineValues(this);
    }
    get bookingId(): number {
      return this._bookingId;
    }
    set bookingId(value: number) {
      this._bookingId = value;
    }
    get parkingSlotName(): string {
      return this._parkingSlotName;
    }
    set parkingSlotName(value: string) {
      this._parkingSlotName = value;
    }
    get startDate(): googleProtobuf002.Timestamp | undefined {
      return this._startDate;
    }
    set startDate(value: googleProtobuf002.Timestamp | undefined) {
      this._startDate = value;
    }
    get endDate(): googleProtobuf002.Timestamp | undefined {
      return this._endDate;
    }
    set endDate(value: googleProtobuf002.Timestamp | undefined) {
      this._endDate = value;
    }

    /**
     * Serialize message to binary data
     * @param instance message instance
     */
    serializeBinary() {
      const writer = new BinaryWriter();
      BookingByUser.serializeBinaryToWriter(this, writer);
      return writer.getResultBuffer();
    }

    /**
     * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)
     */
    toObject(): BookingByUser.AsObject {
      return {
        bookingId: this.bookingId,
        parkingSlotName: this.parkingSlotName,
        startDate: this.startDate ? this.startDate.toObject() : undefined,
        endDate: this.endDate ? this.endDate.toObject() : undefined
      };
    }

    /**
     * Convenience method to support JSON.stringify(message), replicates the structure of toObject()
     */
    toJSON() {
      return this.toObject();
    }

    /**
     * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json
     * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.
     * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required
     */
    toProtobufJSON(
      // @ts-ignore
      options?: ToProtobufJSONOptions
    ): BookingByUser.AsProtobufJSON {
      return {
        bookingId: this.bookingId,
        parkingSlotName: this.parkingSlotName,
        startDate: this.startDate
          ? this.startDate.toProtobufJSON(options)
          : null,
        endDate: this.endDate ? this.endDate.toProtobufJSON(options) : null
      };
    }
  }
  export module BookingByUser {
    /**
     * Standard JavaScript object representation for BookingByUser
     */
    export interface AsObject {
      bookingId: number;
      parkingSlotName: string;
      startDate?: googleProtobuf002.Timestamp.AsObject;
      endDate?: googleProtobuf002.Timestamp.AsObject;
    }

    /**
     * Protobuf JSON representation for BookingByUser
     */
    export interface AsProtobufJSON {
      bookingId: number;
      parkingSlotName: string;
      startDate: googleProtobuf002.Timestamp.AsProtobufJSON | null;
      endDate: googleProtobuf002.Timestamp.AsProtobufJSON | null;
    }
  }
}
