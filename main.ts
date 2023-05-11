function PrintLetter (rgbNum: number) {
    if (rgbNum == Lr) {
        basic.showLeds(`
            # # # # #
            # . . . #
            # # # # .
            # . # . .
            # . . # #
            `)
    } else if (rgbNum == Lg) {
        basic.showLeds(`
            . # # # .
            # . . . .
            # . # # #
            # . . . #
            . # # # .
            `)
    } else if (rgbNum == Lb) {
        basic.showLeds(`
            # # # # .
            . # . . #
            . # # # .
            . # . . #
            # # # # .
            `)
    } else {
    	
    }
}
function BlinkAll (timeMiniSec: number) {
    pins.digitalWritePin(DigitalPin.P14, 1)
    pins.digitalWritePin(DigitalPin.P15, 1)
    pins.digitalWritePin(DigitalPin.P16, 1)
    basic.pause(timeMiniSec)
    pins.digitalWritePin(DigitalPin.P14, 0)
    pins.digitalWritePin(DigitalPin.P15, 0)
    pins.digitalWritePin(DigitalPin.P16, 0)
}
function AnsWrong () {
    basic.showIcon(IconNames.No)
    NRight += 0
    BlinkOne(Ans, 200)
    basic.pause(200)
    BlinkOne(Ans, 200)
    basic.pause(200)
    BlinkOne(Ans, 200)
}
function Play () {
    basic.showString("Go!")
    for (let index = 0; index <= Level - 1; index++) {
        PrintLetter(QuestionColors[index])
        BlinkOne(QuestionColors[index], 800)
        basic.pause(500)
    }
    for (let index = 0; index <= Level - 1; index++) {
        basic.showLeds(`
            . # # # .
            # . . . #
            . . # # .
            . . . . .
            . . # . .
            `)
        while (true) {
            Ans = ReadKey1()
            if (Ans != 0) {
                PrintLetter(Ans)
                if (Ans == QuestionColors[index]) {
                    AnsRight()
                } else {
                    AnsWrong()
                }
                break;
            } else {
                basic.pause(100)
                continue;
            }
        }
    }
}
function BlinkOne (rgbNum: number, timeMiniSec: number) {
    if (rgbNum == Lr) {
        pins.digitalWritePin(DigitalPin.P14, 1)
        basic.pause(timeMiniSec)
        pins.digitalWritePin(DigitalPin.P14, 0)
    }
    if (rgbNum == Lg) {
        pins.digitalWritePin(DigitalPin.P15, 1)
        basic.pause(timeMiniSec)
        pins.digitalWritePin(DigitalPin.P15, 0)
    }
    if (rgbNum == Lb) {
        pins.digitalWritePin(DigitalPin.P16, 1)
        basic.pause(timeMiniSec)
        pins.digitalWritePin(DigitalPin.P16, 0)
    }
}
function GenRandomColors (N: number) {
    for (let index2 = 0; index2 <= N; index2++) {
        QuestionColors[index2] = randint(1, 3)
    }
}
function ReadKeyImp () {
    if (pins.digitalReadPin(DigitalPin.P0) == 1) {
        key2 = Kr
    } else if (pins.digitalReadPin(DigitalPin.P1) == 1) {
        key2 = Kg
    } else if (pins.digitalReadPin(DigitalPin.P2) == 1) {
        key2 = Kb
    } else {
        key2 = 0
    }
    return key2
}
function ReadKey () {
    key2 = ReadKeyImp()
    basic.pause(10)
    if (ReadKeyImp() != key2) {
        key2 = 0
    }
    return key2
}
function ShowResult () {
    for (let index = 0; index < 5; index++) {
        BlinkAll(100)
        basic.pause(100)
    }
    basic.showString("RIGHT:")
    basic.showNumber(NRight)
    for (let index = 0; index < 5; index++) {
        BlinkAll(100)
        basic.pause(100)
    }
    basic.showString("SCORE:")
    basic.showNumber(Math.round(NRight / Level * 100))
    if (NRight / Level * 100 == 70) {
        for (let index = 0; index < 5; index++) {
            BlinkOne(Lg, 200)
            basic.pause(100)
        }
    }
    basic.showArrow(ArrowNames.SouthEast)
}
function AnsRight () {
    basic.showIcon(IconNames.Yes)
    NRight += 1
    BlinkOne(Ans, 1000)
}
function Play2 () {
    for (let index4 = 0; index4 <= Level; index4++) {
        while (true) {
            Ans = ReadKey1()
            if (Ans == QuestionColors[index4]) {
                AnsRight()
            } else {
                AnsWrong()
            }
        }
    }
}
function Init () {
    NRight = 0
    BlinkAll(500)
    basic.showIcon(IconNames.Target)
    basic.showIcon(IconNames.Chessboard)
    basic.showString("Color Game")
    basic.showArrow(ArrowNames.SouthEast)
    BlinkAll(300)
}
function ReadKey1 () {
    if (input.pinIsPressed(TouchPin.P0)) {
        key2 = Kr
    } else if (input.pinIsPressed(TouchPin.P1)) {
        key2 = Kg
    } else if (input.pinIsPressed(TouchPin.P2)) {
        key2 = Kb
    } else {
        key2 = 0
    }
    return key2
}
function SetLevel () {
    while (true) {
        basic.showNumber(Level)
        basic.pause(20)
        key = ReadKey1()
        if (key == Kr) {
            Level += -1
            if (Level < MinLevel) {
                Level = MinLevel
            }
        } else if (key == Kg) {
            break;
        } else if (key == Kb) {
            Level += 1
            if (Level > MaxLevel) {
                Level = MaxLevel
            }
        } else {
            continue;
        }
    }
}
let key = 0
let key2 = 0
let Ans = 0
let NRight = 0
let Lb = 0
let Lg = 0
let Lr = 0
let Kb = 0
let Kg = 0
let Kr = 0
let Level = 0
let QuestionColors: number[] = []
let MinLevel = 0
let MaxLevel = 0
MaxLevel = 20
MinLevel = 5
QuestionColors = [MaxLevel, 1]
Level = 5
Kr = 1
Kg = 2
Kb = 3
Lr = 1
Lg = 2
Lb = 3
basic.forever(function () {
    Init()
    while (true) {
        if (ReadKey1() > 0) {
            break;
        }
    }
    SetLevel()
    GenRandomColors(Level)
    Play()
    ShowResult()
    while (true) {
        if (ReadKey1() > 0) {
            break;
        }
    }
})
