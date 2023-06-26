# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def addTwoNumbers(self, l1, l2):
        currentNodeL1 = l1
        currentNodeL2 = l2
        l1List = []
        l2List = []
        while currentNodeL1 is not None or currentNodeL2 is not None:
            if currentNodeL1 is not None:  
                l1List.append(currentNodeL1.val)
                currentNodeL1 = currentNodeL1.next
            if currentNodeL2 is not None:
                l2List.append(currentNodeL2.val)
                currentNodeL2 = currentNodeL2.next
        l1List.reverse()
        l2List.reverse()
        l1Num = int(''.join(map(str, l1List)))
        l2Num = int(''.join(map(str, l2List)))
        
        result = l1Num + l2Num
        lResult = ListNode()
        
        for x in range(len(str(result)) - 1, -1, -1):
            lResult.val = int(str(result)[x])
            
        return lResult

