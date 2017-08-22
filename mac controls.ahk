#NoEnv  ; Recommended for performance and compatibility with future AutoHotkey releases.
#Warn  ; Enable warnings to assist with detecting common errors.
SendMode Input  ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir %A_ScriptDir%  ; Ensures a consistent starting directory.

; Undo, Redo
!z::
    Send, {ctrl down}z{ctrl up}
Return
!+z::
    Send, {ctrl down}y{ctrl up}
Return

; Cut, copy, paste
!x::
    Send, {ctrl down}x{ctrl up}
Return
!c::
    Send, {ctrl down}c{ctrl up}
Return
!v::
    Send, {ctrl down}v{ctrl up}
Return

; Moving the cursor
!Right::
    Send, {End}
Return
!Left::
    Send, {Home}
Return

; Selecting text
!+Right::
    Send, {shift down}{End}{shift up}
Return
!+Left::
    Send, {shift down}{Home}{shift up}
Return
!f::
    Send, {ctrl down}f{ctrl up}
Return
!r::
    IfWinActive, ahk_exe chrome.exe
    {
        Send, {F5}
        Return
    }
    Send, {ctrl down}h{ctrl up}
Return

; Text editing
#+Down::
    IfWinActive, ahk_exe Code.exe
    {
        Send, {alt down}{Down}{alt up}
        Return
    }
    Send, {End}{shift down}{Home}{Home}{shift up}
    Send, {ctrl down}x{ctrl up}
    Send, {Down}{Home}{Home}
    Send, {ctrl down}v{ctrl up}
    Send, {Enter}
Return
#+Up::
    IfWinActive, ahk_exe Code.exe
    {
        Send, {alt down}{Up}{alt up}
        Return
    }
    Send, {End}{shift down}{Home}{Home}{shift up}
    Send, {ctrl down}x{ctrl up}
    Send, {Up}{Home}{Home}
    Send, {ctrl down}v{ctrl up}
    Send, {Enter}
Return

; File operations
!s::
    Send, {ctrl down}s{ctrl up}
Return
!o::
    Send, {ctrl down}o{ctrl up}
Return
!w::
    Send, {ctrl down}w{ctrl up}
Return

; Window snapping
^#!Left::
    Send, {LWin down}{Left}{LWin up}
Return
^#!Right::
    Send, {LWin down}{Right}{LWin up}
Return
^#!m::
    Send, {LWin down}{Up}{Up}{Up}{LWin up}
Return

; Cortana
!Space::
    Send, {LWin down}q{LWin up}
Return

; Chrome
!t::
    Send, {ctrl down}t{ctrl up}
Return
!1::
    Send, {ctrl down}1{ctrl up}
Return
!2::
    Send, {ctrl down}2{ctrl up}
Return
!3::
    Send, {ctrl down}3{ctrl up}
Return
!4::
    Send, {ctrl down}4{ctrl up}
Return
!5::
    Send, {ctrl down}5{ctrl up}
Return
!6::
    Send, {ctrl down}6{ctrl up}
Return
!7::
    Send, {ctrl down}7{ctrl up}
Return
!8::
    Send, {ctrl down}8{ctrl up}
Return
!9::
    Send, {ctrl down}9{ctrl up}
Return
!#Right::
    Send, {ctrl down}{PgDn}{ctrl up}
Return
!#Left::
    Send, {ctrl down}{PgUp}{ctrl up}
Return

; VSCode
!+o::
    IfWinActive, ahk_exe Code.exe
    {
        Send, {ctrl down}p{ctrl up}
        Return
    }
Return

!+f::
    IfWinActive, ahk_exe Code.exe
    {
        Send, {ctrl down}{shift down}f{shift up}{ctrl up}
        Return
    }
Return

!+r::
    IfWinActive, ahk_exe Code.exe
    {
        Send, {ctrl down}{shift down}h{shift up}{ctrl up}
        Return
    }
    IfWinActive, ahk_exe chrome.exe
    {
        Send, {ctrl down}{shift down}r{shift up}{ctrl up}
        Return
    }
Return