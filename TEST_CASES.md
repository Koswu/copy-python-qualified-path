/**
 * Manual test validation for the indentation fix
 * 
 * This file documents test cases to manually verify the fix works correctly.
 * Since there's no test infrastructure, these should be tested manually in VSCode.
 */

// Test Case 1: Top-level function should NOT include class name
// File: test_scenarios.py, Line 4 (top_level_function)
// Expected: module.top_level_function
// Before fix: might incorrectly include a class name if there was one above

// Test Case 2: Method inside class should include class name  
// File: test_scenarios.py, Line 10 (method_in_class)
// Expected: module.MyClass.method_in_class

// Test Case 3: Function after class should NOT include class name
// File: test_scenarios.py, Line 19 (function_after_class)  
// Expected: module.function_after_class
// Before fix: would incorrectly include MyClass

// Test Case 4: Method in second class should include correct class name
// File: test_scenarios.py, Line 24 (some_method in AnotherClass)
// Expected: module.AnotherClass.some_method

// Test Case 5: Function after multiple classes should NOT include any class name
// File: test_scenarios.py, Line 29 (final_top_level_function)
// Expected: module.final_top_level_function  
// Before fix: would incorrectly include AnotherClass

/**
 * Key fix explanation:
 * - Uses line.search(/\S/) to find first non-whitespace character (indentation level)
 * - Only assigns className if classIndent < currentIndent (class is less indented than function)
 * - This ensures top-level functions (indent 0) won't match classes (also indent 0)
 * - But methods inside classes (indent > 0) will match their enclosing class (indent 0)
 */
