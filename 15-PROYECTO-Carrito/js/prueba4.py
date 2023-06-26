def findMedianSortedArrays(nums1, nums2) -> float:
    ans = None
    nums = nums1 + nums2
    size = len(nums)
    l = size // 2
    if size % 2 == 0:
        median = (nums[l] + nums[l - 1]) / 2
    else:
        median = (nums[l])
    return median

        
findMedianSortedArrays([1, 2], [4])