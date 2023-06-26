def myAtoi(s: str) -> int:
    l = 0
    w = 0
    d = 1
    foundN = False
    foundSign = False
    f = True
    for x in range(len(s)):
        if s[x].isnumeric() and f:
            l = l * 10 + int(s[x])
            w += 1
            foundN = True
        elif s[x] == '-':
            if foundSign:
                break
            if foundN:
                break
            d = -1
            foundSign = True
        elif s[x] == '+':
            if foundSign:
                l = 0
                break
            if foundN:
                l = 0
                break
            d = 1
            foundSign = True
        elif s[x] == ' ':
            if foundN:
                break
        else:
            f = False
            break
    l = l * d
    if l > (2 ** 31) - 1:
        l = (2 ** 31) - 1
    elif l < -2 ** 31:
        l = -2 ** 31
    return l

print(myAtoi("-91283472332"))