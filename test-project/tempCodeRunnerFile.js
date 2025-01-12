/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  const ans = [],
    path = [],
    n = nums.length;

  const dfs = (i, list) => {
    if (i === n) {
      ans.push([...path]);
      return;
    }
    for (const x of list) {
      path[i] = x;
      dfs(
        i + 1,
        list.filter((e) => e !== x)
      );
      path.pop();
    }
  };
  dfs(0, nums);
  return ans;
};

console.log(permute([1, 2, 3]));
