window.onload = function(){
  module("Equivalent Parts Objects");

  test("New parts objects - different selectors - not equivalent", function() {
    var value = p("body");
    var value2 = p("#hello");
    var value3 = p("body");
    equals(QUnit.equiv(value.sig, value2.sig), false, "Different objects");
    equals(QUnit.equiv(value.sig, value3.sig), true, "Same objects - Different creation");
    //equals(QUnit.equiv(value.value, value2.value), false, "Different value");
    //equals(QUnit.equiv(value.value, value3.value), true, "Same value");
    equals(QUnit.equiv(value.value[0], value2.value[0]), false, "Different value[0]");
    equals(QUnit.equiv(value.value[0], value3.value[0]), true, "Same value[0]");
  });
  
  module("Module A");
  
  test("Selection and chaining by-products", function() {
    var stringContents = '<p class="test_p">Testing</p>';
    var createdElement = p("#qunit-fixture").html(stringContents);
    var createdInnerHTML = p("#qunit-fixture").html();
    var secondInnerHTML = createdElement.html();
    var selectedElement = p("#qunit-fixture").append().click();
    var selectedElement2 = p("#qunit-fixture");
    p("#qunit-fixture").html("<p>void</p>");
    var modifiedInnerHTML = p("#qunit-fixture").html();
    
    equals(QUnit.equiv(createdElement.sig, selectedElement.sig),
        false, "Same Selected Elements & Chained Elements, different contents"
    );
    equals(QUnit.equiv(createdElement.queryString, selectedElement.queryString),
        true, "Query string preserved through chaining"
    );
    equals(QUnit.equiv(selectedElement.sig, selectedElement2.sig),
        true, "Signature preserved through chaining"
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