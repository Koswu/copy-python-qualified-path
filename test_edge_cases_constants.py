# Edge cases for constant detection

# Edge Case 1: Indented assignment (inside a function) - should NOT be detected as a constant
def some_function():
    local_var = 42  # This should NOT match as constant because it's indented
    return local_var

# Edge Case 2: Assignment with type annotation
my_typed_var: int = 42  # Will this match? Yes, it will match 'my_typed_var'

# Edge Case 3: Multiple assignments on same line
a = b = c = 10  # Should match 'a'

# Edge Case 4: Tuple unpacking
x, y = 1, 2  # Should match 'x' (or might not match at all)

# Edge Case 5: Assignment with no space around =
no_space=100  # Should still match 'no_space'

# Edge Case 6: Assignment with lots of spaces
lots_of_spaces    =    200  # Should match 'lots_of_spaces'

# Edge Case 7: Class constant (indented) - should NOT be detected as top-level constant
class TestClass:
    CLASS_VAR = 500  # This is indented, should NOT match

# Edge Case 8: Comment line - should fall back to import *
# This is just a comment

# Edge Case 9: Empty line - should fall back to import *

# Edge Case 10: Import statement - should fall back to import *

# Edge Case 11: From import statement - should fall back to import *
