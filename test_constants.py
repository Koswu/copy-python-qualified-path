# Test file for constant support

# Test Case 1: Top-level constants
MY_CONSTANT = 42
# Expected qualified path: test_constants.MY_CONSTANT
# Expected import: from test_constants import MY_CONSTANT

API_KEY = "some_key"
# Expected qualified path: test_constants.API_KEY
# Expected import: from test_constants import API_KEY

CONFIG_DATA = {"key": "value"}
# Expected qualified path: test_constants.CONFIG_DATA
# Expected import: from test_constants import CONFIG_DATA

# Test Case 2: Mixed - constant after class
class MyClass:
    CLASS_CONSTANT = 100
    # Expected qualified path: test_constants.MyClass.CLASS_CONSTANT (not supported for class constants)
    # Expected import: from test_constants import MyClass
    
    def method(self):
        # Expected qualified path: test_constants.MyClass.method
        # Expected import: from test_constants import MyClass
        pass

# Test Case 3: Top-level function
def my_function():
    # Expected qualified path: test_constants.my_function
    # Expected import: from test_constants import my_function
    pass

# Test Case 4: More constants
MAX_RETRIES = 5
# Expected qualified path: test_constants.MAX_RETRIES
# Expected import: from test_constants import MAX_RETRIES

TIMEOUT = 30
# Expected qualified path: test_constants.TIMEOUT
# Expected import: from test_constants import TIMEOUT

# Test Case 5: Empty line or comment line
# When clicking on a comment or empty line without any recognizable pattern
# Expected qualified path: test_constants (module only)
# Expected import: from test_constants import *

# Test Case 6: Variable with complex right-hand side
settings = {
    "timeout": 30,
    "retries": 5
}
# Expected qualified path: test_constants.settings
# Expected import: from test_constants import settings
