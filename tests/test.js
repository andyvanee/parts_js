window.onload = function(){
  module("Equivalent Parts Objects");

  test("New parts objects - different selectors - not equivalent", function() {
    var value = p("body");
    var value2 = p("#hello");
    var value3 = p("body");
    equals(QUnit.equiv(value, value2), false, "Different objects");
    equals(QUnit.equiv(value, value3), true, "Same objects");
    equals(QUnit.equiv(value.value, value2.value), false, "Different value");
    equals(QUnit.equiv(value.value, value3.value), true, "Same value");
    equals(QUnit.equiv(value.value[0], value2.value[0]), false, "Different value[0]");
    equals(QUnit.equiv(value.value[0], value3.value[0]), true, "Same value[0]");
  });
  
  module("Module A");
  
  test("Selection and chaining by-products", function() {
    var stringContents = '<p class="test_p">Testing</p>';
    var createdElement = p("#qunit-fixture").html(stringContents);
    var createdInnerHTML = p("#qunit-fixture").html();
    var secondInnerHTML = createdElement.html();
    var selectedElement = p("#qunit-fixture");
    p("#qunit-fixture").html("<p>void</p>");
    var modifiedInnerHTML = p("#qunit-fixture").html();
    
    equals(QUnit.equiv(createdElement, selectedElement),
        true, "Selected Elements & Chained Elements equivalent"
    );
    equals(QUnit.equiv(createdInnerHTML, secondInnerHTML),
        true, "HTML contents by selection or reference"
    );
    equals(QUnit.equiv(
        createdElement.value[0],
        selectedElement.value[0]),
        true, "Selected Elements & Chained Elements value[0] equivalent"
    );
    equals(QUnit.equiv(
        createdInnerHTML, stringContents),
        true, "Returned HTML contents equals original. Beware single-quotes."
    );
    equals(QUnit.equiv(
        createdInnerHTML, modifiedInnerHTML),
        false, "Modified innerHTML"
    );
  });
  
  test("Equivalence Selections", function() {
    p("#qunit-fixture").value[0].className = "qunit-fixture";
    p("#qunit-fixture").html('<p class="first">void</p><p class="second">void</p>');
    
    equals(QUnit.equiv(
        p("#qunit-fixture").html(),
        p("#qunit-fixture").html()),
        true, "html contents of same object."
    );
    equals(QUnit.equiv(
        p("#qunit-fixture").html(),
        p(".qunit-fixture").html()),
        true, "html contents: id vs. class selection"
    );
    equals(QUnit.equiv(
      p("#qunit-fixture").html(),
      p("body div.qunit-fixture").html()),
      true, "html contents: id vs. child selection"
    );
    equals(QUnit.equiv(
        p("#qunit-fixture").html(),
        p("body>div.qunit-fixture").html()),
        true, "html contents: id vs. child selection"
    );
    equals(QUnit.equiv(
        p(".first").html(),
        p(".second").html()),
        true, "html contents: class1 & class2"
    );
    equals(QUnit.equiv(
        p(".first").html(),
        p(".qunit-fixture").html()),
        false, "html contents: class1 & other"
    );
        
  });  
};