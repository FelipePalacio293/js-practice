from sys import stdin

def twoSum(numbers, target):
    d = {}
    for i, num in enumerate(numbers):
        diff = target - num
        if diff in d:
            return [d[diff], i]
        d[num] = i

def main():
    numbers = eval(stdin.readline())
    target = int(input())
    print(twoSum(numbers, target))

main()