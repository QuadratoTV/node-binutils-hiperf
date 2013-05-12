var BinaryReader = function(p_InputBuffer, p_Endianness, p_Encoding) {
    // Instantiate the buffer (if needed)
    if (p_InputBuffer instanceof Buffer) {
        this.ByteBuffer = p_InputBuffer;
    } else if (p_InputBuffer instanceof Array || typeof p_InputBuffer == 'string') {
        this.ByteBuffer = new Buffer(p_InputBuffer, p_Encoding);
    } else {
        throw new Error('Invalid buffer input for BinaryReader (' + typeof p_InputBuffer + ')');
    }

    // Set the endianness
    this.Endianness = p_Endianness == 'little' || false;

    // Set the encoding
    this.Encoding = p_Encoding || 'ascii';

    // Set the length
    this.Length = this.ByteBuffer.length;

    // Set the position to 0
    this.Position = 0;
};

BinaryReader.prototype = {
    ReadUInt8: function() {
        if (this.ByteBuffer.length < 1) {
            return 0;
        }

        var s_Val = this.ByteBuffer.readUInt8(this.Position);
        ++this.Position;
        return s_Val;
    },

    ReadUInt16: function() {
        if (this.ByteBuffer.length < 2) {
            return 0;
        }

        var s_Val = (this.Endianness) ? this.ByteBuffer.readUInt16LE(this.Position) : this.ByteBuffer.readUInt16BE(this.Position);
        this.Position += 2;
        return s_Val;
    },

    ReadUInt32: function() {
        if (this.ByteBuffer.length < 4) {
            return 0;
        }

        var s_Val = (this.Endianness) ? this.ByteBuffer.readUInt32LE(this.Position) : this.ByteBuffer.readUInt32BE(this.Position);
        this.Position += 4;
        return s_Val;
    },

    ReadInt8: function() {
        if (this.ByteBuffer.length < 1) {
            return 0;
        }

        var s_Val = this.ByteBuffer.readInt8(this.Position);
        ++this.Position;
        return s_Val;
    },

    ReadInt16: function() {
        if (this.ByteBuffer.length < 2) {
            return 0;
        }

        var s_Val = (this.Endianness) ? this.ByteBuffer.readInt16LE(this.Position) : this.ByteBuffer.readInt16BE(this.Position);
        this.Position += 2;
        return s_Val;
    },

    ReadInt32: function() {
        if (this.ByteBuffer.length < 4) {
            return 0;
        }

        var s_Val = (this.Endianness) ? this.ByteBuffer.readInt32LE(this.Position) : this.ByteBuffer.readInt32BE(this.Position);
        this.Position += 4;
        return s_Val;
    },

    ReadFloat: function() {
        if (this.ByteBuffer.length < 4) {
            return 0.0;
        }

        var s_Val = (this.Endianness) ? this.ByteBuffer.readFloatLE(this.Position) : this.ByteBuffer.readFloatBE(this.Position);
        this.Position += 4;
        return s_Val;
    },

    ReadDouble: function() {
        if (this.ByteBuffer.length < 8) {
            return 0.0;
        }

        var s_Val = (this.Endianness) ? this.ByteBuffer.readDoubleLE(this.Position) : this.ByteBuffer.readDoubleBE(this.Position);
        this.Position += 8;
        return s_Val;
    },

    ReadBytes: function(p_Count) {
        if (p_Count > this.ByteBuffer.length) {
            return new Buffer(0);
        }

        var s_Val = this.ByteBuffer.slice(this.Position, this.Position + p_Count);
        this.Position += p_Count;
        return s_Val;
    }
};

///

var BinaryWriter = function(p_PredefinedLength, p_Endianness, p_Encoding) {
    // Instantiate the buffer
    this.ByteBuffer = new Buffer(p_PredefinedLength || 0);

    // Set the endianness
    this.Endianness = p_Endianness == 'little' || false;

    // Set the encoding
    this.Encoding = p_Encoding || 'ascii';

    // Set the length to 0
    this.Length = 0;

    this.PredefinedLength = p_PredefinedLength || 0;
};

BinaryWriter.prototype = {
    WriteUInt8: function(p_Value) {
        if (this.PredefinedLength > this.Length)
        {
            this.ByteBuffer.writeUInt8(p_Value, this.Length);
            this.Length += 1;
            return;
        }

        var s_TempBuffer = new Buffer(1);
        s_TempBuffer.writeUInt8(p_Value, 0);
        this.Length += 1;
        this.ByteBuffer = Buffer.concat([this.ByteBuffer, s_TempBuffer], this.Length);
    },

    WriteUInt16: function(p_Value) {
        if (this.PredefinedLength > this.Length + 1)
        {
            if (this.Endianness) {
                this.ByteBuffer.writeUInt16LE(p_Value, this.Length);
            } else {
                this.ByteBuffer.writeUInt16BE(p_Value, this.Length);
            }
            this.Length += 2;
            return;
        }

        var s_TempBuffer = new Buffer(2);
        if (this.Endianness) {
            s_TempBuffer.writeUInt16LE(p_Value, 0);
        } else {
            s_TempBuffer.writeUInt16BE(p_Value, 0);
        }
        this.Length += 2;
        this.ByteBuffer = Buffer.concat([this.ByteBuffer, s_TempBuffer], this.Length);
    },

    WriteUInt32: function(p_Value) {
        if (this.PredefinedLength > this.Length + 3)
        {
            if (this.Endianness) {
                this.ByteBuffer.writeUInt32LE(p_Value, this.Length);
            } else {
                this.ByteBuffer.writeUInt32BE(p_Value, this.Length);
            }
            this.Length += 4;
            return;
        }

        var s_TempBuffer = new Buffer(4);
        if (this.Endianness) {
            s_TempBuffer.writeUInt32LE(p_Value, 0);
        } else {
            s_TempBuffer.writeUInt32BE(p_Value, 0);
        }
        this.Length += 4;
        this.ByteBuffer = Buffer.concat([this.ByteBuffer, s_TempBuffer], this.Length);
    },

    WriteInt8: function(p_Value) {
        if (this.PredefinedLength > this.Length)
        {
            this.ByteBuffer.writeInt8(p_Value, this.Length);
            this.Length += 1;
            return;
        }

        var s_TempBuffer = new Buffer(1);
        s_TempBuffer.writeInt8(p_Value, 0);
        this.Length += 1;
        this.ByteBuffer = Buffer.concat([this.ByteBuffer, s_TempBuffer], this.Length);
    },

    WriteInt16: function(p_Value) {
        if (this.PredefinedLength > this.Length + 1)
        {
            if (this.Endianness) {
                this.ByteBuffer.writeInt16LE(p_Value, this.Length);
            } else {
                this.ByteBuffer.writeInt16BE(p_Value, this.Length);
            }
            this.Length += 2;
            return;
        }

        var s_TempBuffer = new Buffer(2);
        if (this.Endianness) {
            s_TempBuffer.writeInt16LE(p_Value, 0);
        } else {
            s_TempBuffer.writeInt16BE(p_Value, 0);
        }
        this.Length += 2;
        this.ByteBuffer = Buffer.concat([this.ByteBuffer, s_TempBuffer], this.Length);
    },

    WriteInt32: function(p_Value) {
        if (this.PredefinedLength > this.Length + 3)
        {
            if (this.Endianness) {
                this.ByteBuffer.writeInt32LE(p_Value, this.Length);
            } else {
                this.ByteBuffer.writeInt32BE(p_Value, this.Length);
            }
            this.Length += 4;
            return;
        }

        var s_TempBuffer = new Buffer(4);
        if (this.Endianness) {
            s_TempBuffer.writeInt32LE(p_Value, 0);
        } else {
            s_TempBuffer.writeInt32BE(p_Value, 0);
        }
        this.Length += 4;
        this.ByteBuffer = Buffer.concat([this.ByteBuffer, s_TempBuffer], this.Length);
    },

    WriteFloat: function(p_Value) {
        if (this.PredefinedLength > this.Length + 3)
        {
            if (this.Endianness) {
                this.ByteBuffer.writeFloatLE(p_Value, this.Length);
            } else {
                this.ByteBuffer.writeFloatBE(p_Value, this.Length);
            }
            this.Length += 4;
            return;
        }

        var s_TempBuffer = new Buffer(4);
        if (this.Endianness) {
            s_TempBuffer.writeFloatLE(p_Value, 0);
        } else {
            s_TempBuffer.writeFloatBE(p_Value, 0);
        }
        this.Length += 4;
        this.ByteBuffer = Buffer.concat([this.ByteBuffer, s_TempBuffer], this.Length);
    },

    WriteDouble: function(p_Value) {
        if (this.PredefinedLength > this.Length + 7)
        {
            if (this.Endianness) {
                this.ByteBuffer.writeDoubleLE(p_Value, this.Length);
            } else {
                this.ByteBuffer.writeDoubleBE(p_Value, this.Length);
            }
            this.Length += 8;
            return;
        }

        var s_TempBuffer = new Buffer(8);
        if (this.Endianness) {
            s_TempBuffer.writeDoubleLE(p_Value, 0);
        } else {
            s_TempBuffer.writeDoubleBE(p_Value, 0);
        }
        this.Length += 8;
        this.ByteBuffer = Buffer.concat([this.ByteBuffer, s_TempBuffer], this.Length);
    },

    WriteBytes: function(p_Value) {

        if (typeof p_Value == 'string') {
            // Ugly hack
            var s_BytesArray = [];

            for (var i = 0; i < p_Value.length; ++i) {
                s_BytesArray.push(p_Value.charCodeAt(i));
            }

            p_Value = s_BytesArray;
        }

        if (!p_Value instanceof Buffer && !p_Value instanceof Array) {
            throw new Error("Invalid Buffer object provided.");
        }

        var s_TempBuffer = (p_Value instanceof Buffer) ? p_Value : new Buffer(p_Value);

        if (this.PredefinedLength > this.Length + s_TempBuffer.length - 1)
        {
            s_TempBuffer.copy(this.ByteBuffer, this.Length, 0, s_TempBuffer.length);
            this.Length += s_TempBuffer.length;
            return;
        }

        this.Length += s_TempBuffer.length;
        this.ByteBuffer = Buffer.concat([this.ByteBuffer, s_TempBuffer], this.Length);
    }
};

// Export our classes
module.exports = {
    BinaryReader: BinaryReader,
    BinaryWriter: BinaryWriter
};