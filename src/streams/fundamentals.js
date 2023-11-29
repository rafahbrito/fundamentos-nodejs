import { Readable, Writable, Transform } from 'node:stream'

class OneToHundredStream extends Readable {
  index = 0
  _read() {
    const i = this.index++
    setTimeout(() => {
      if (i > 100) {
        this.push(null)
      } else {
        const buffer = Buffer.from(i.toString())
        this.push(buffer)
      }
    }, 500)
  }
}

class MultiplyByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    try {
      const number = Number(chunk.toString())
      if (isNaN(number)) {
        throw new Error('Invalid content for multiplication.')
      }
      const result = number * 10
      console.log(result)
      callback()
    } catch (error) {
      callback(error)
    }
  }
}

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    try {
      const number = Number(chunk.toString())
      if (isNaN(number)) {
        throw new Error('Content not valid for conversion.')
      }
      const result = number * -1
      const buffer = Buffer.from(result.toString())
      this.push(buffer)
      callback()
    } catch (error) {
      callback(error)
    }
  }
}

new OneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTenStream())
