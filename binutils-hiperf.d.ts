declare module 'binutils-hiperf' {
    type Endianness = 'little' | 'big';
    type Encoding = 'ascii' | 'utf8' | 'utf16le' | 'ucs2' | 'base64' | 'binary' | 'hex';
    type BufferInput = Buffer | Array<number> | string;

    class BinaryReader {
        /**
         * Creates a new BinaryReader instance
         * @param p_InputBuffer The buffer to read from
         * @param p_Endianness The endianness of the buffer ('little' or 'big')
         * @param p_Encoding The encoding of the buffer
         */
        constructor(p_InputBuffer: BufferInput, p_Endianness?: Endianness, p_Encoding?: Encoding);

        /** The underlying buffer */
        ByteBuffer: Buffer;

        /** The endianness of the buffer (true for little endian, false for big endian) */
        Endianness: boolean;

        /** The encoding of the buffer */
        Encoding: string;

        /** The length of the buffer */
        Length: number;

        /** The current position in the buffer */
        Position: number;

        /** Reads an unsigned 8-bit integer from the buffer */
        ReadUInt8(): number;

        /** Reads an unsigned 16-bit integer from the buffer */
        ReadUInt16(): number;

        /** Reads an unsigned 32-bit integer from the buffer */
        ReadUInt32(): number;

        /** Reads a signed 8-bit integer from the buffer */
        ReadInt8(): number;

        /** Reads a signed 16-bit integer from the buffer */
        ReadInt16(): number;

        /** Reads a signed 32-bit integer from the buffer */
        ReadInt32(): number;

        /** Reads a 32-bit floating point number from the buffer */
        ReadFloat(): number;

        /** Reads a 64-bit floating point number from the buffer */
        ReadDouble(): number;

        /**
         * Reads a specific number of bytes from the buffer
         * @param p_Count The number of bytes to read
         */
        ReadBytes(p_Count: number): Buffer;
    }

    class BinaryWriter {
        /**
         * Creates a new BinaryWriter instance
         * @param p_PredefinedLength The predefined length of the buffer
         * @param p_Endianness The endianness of the buffer ('little' or 'big')
         * @param p_Encoding The encoding of the buffer
         */
        constructor(p_PredefinedLength?: number, p_Endianness?: Endianness, p_Encoding?: Encoding);

        /** The underlying buffer */
        ByteBuffer: Buffer;

        /** The endianness of the buffer (true for little endian, false for big endian) */
        Endianness: boolean;

        /** The encoding of the buffer */
        Encoding: string;

        /** The current length of the buffer */
        Length: number;

        /** The predefined length of the buffer */
        PredefinedLength: number;

        /**
         * Writes an unsigned 8-bit integer to the buffer
         * @param p_Value The value to write
         */
        WriteUInt8(p_Value: number): void;

        /**
         * Writes an unsigned 16-bit integer to the buffer
         * @param p_Value The value to write
         */
        WriteUInt16(p_Value: number): void;

        /**
         * Writes an unsigned 32-bit integer to the buffer
         * @param p_Value The value to write
         */
        WriteUInt32(p_Value: number): void;

        /**
         * Writes a signed 8-bit integer to the buffer
         * @param p_Value The value to write
         */
        WriteInt8(p_Value: number): void;

        /**
         * Writes a signed 16-bit integer to the buffer
         * @param p_Value The value to write
         */
        WriteInt16(p_Value: number): void;

        /**
         * Writes a signed 32-bit integer to the buffer
         * @param p_Value The value to write
         */
        WriteInt32(p_Value: number): void;

        /**
         * Writes a 32-bit floating point number to the buffer
         * @param p_Value The value to write
         */
        WriteFloat(p_Value: number): void;

        /**
         * Writes a 64-bit floating point number to the buffer
         * @param p_Value The value to write
         */
        WriteDouble(p_Value: number): void;

        /**
         * Writes bytes to the buffer
         * @param p_Value The bytes to write (Buffer, array of numbers, or string)
         */
        WriteBytes(p_Value: Buffer | number[] | string): void;
    }

    export {
        BinaryReader,
        BinaryWriter
    };
}