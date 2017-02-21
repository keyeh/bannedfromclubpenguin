#NoEnv  ; Recommended for performance and compatibility with future AutoHotkey releases.
; #Warn  ; Enable warnings to assist with detecting common errors.
SendMode Input  ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir %A_ScriptDir%  ; Ensures a consistent starting directory.

IfWinExist, Create Your Penguin | Club Penguin
    WinActivate
else
    MsgBox Something went wrong

Send ^t
Send {Raw}http://play.clubpenguin.com/#/login
Sleep 200
Send {Enter}
Send ^1