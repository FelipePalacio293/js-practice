def isPalyndrome(s):
    if s == s[::-1]:
        return True
    return False

def longestPalyndrome(s, n, palyndrome):
    if n == len(s):
        if isPalyndrome(palyndrome):
            return len(palyndrome), palyndrome
        else:
            return float('-inf'), []
    else:
        a, b = longestPalyndrome(s, n + 1, palyndrome + s[n])
        c, d = longestPalyndrome(s, n + 1, palyndrome)
        if a > c:
            return a, b
        else:
            return c, d
        

print(longestPalyndrome('babad', 0, '')[1])

