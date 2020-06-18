let updt_servo = 0
let result = ""
serial.redirect(
SerialPin.USB_TX,
SerialPin.USB_RX,
BaudRate.BaudRate9600
)
let _default = 20
let servo1_pos = _default
let servo2_pos = _default
pins.servoWritePin(AnalogPin.P0, servo1_pos)
pins.servoWritePin(AnalogPin.P1, servo2_pos)
basic.forever(function () {
    result = serial.readLine()
    if (result == "up") {
        basic.showLeds(`
            . . # . .
            . # # # .
            # . # . #
            . . # . .
            . . # . .
            `)
        servo1_pos += 5
    } else if (result == "down") {
        basic.showLeds(`
            . . # . .
            . . # . .
            # . # . #
            . # # # .
            . . # . .
            `)
        servo1_pos += -5
    } else if (result == "left") {
        basic.showLeds(`
            . . # . .
            . # . . .
            # # # # #
            . # . . .
            . . # . .
            `)
        servo2_pos += 5
    } else if (result == "right") {
        basic.showLeds(`
            . . # . .
            . . . # .
            # # # # #
            . . . # .
            . . # . .
            `)
        servo2_pos += -5
    } else if (result == "stop") {
        basic.showIcon(IconNames.No)
        updt_servo = 0
    } else if (result == "reset") {
        basic.showIcon(IconNames.SmallSquare)
        servo1_pos = _default
        servo2_pos = _default
    }
    if (updt_servo) {
        pins.servoWritePin(AnalogPin.P0, servo1_pos)
        pins.servoWritePin(AnalogPin.P1, servo2_pos)
    }
    updt_servo = 1
})
