#NoEnv  ; Recommended for performance and compatibility with future AutoHotkey releases.
; #Warn  ; Enable warnings to assist with detecting common errors.
SendMode Input  ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir %A_ScriptDir%  ; Ensures a consistent starting directory.

SetKeyDelay, 10

IfWinExist, Play Now! | Club Penguin
    WinActivate


IniRead, name, penguin.txt, penguin, name
IniRead, pass, penguin.txt, penguin, pass

Send ^{Tab}

x::
Click 200, 300
Sleep 100
Send {Tab}%name%
Send {Tab}%pass%
Send {Tab}{Tab}{Tab}{Enter}
Loop
{
	Sleep 250
	Send {Enter}fuck{Enter}
	Click 527, 722

	; Hold escape to exit
	GetKeyState, escKey, Escape
	if escKey = D
		ExitApp
}
