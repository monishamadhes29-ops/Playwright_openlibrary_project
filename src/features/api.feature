Feature: Open Library Search API Validation

  Scenario: Validate search API for a valid term
    When I call search API with "The Hobbit"
    Then the response status should be 200
    And the response should be valid JSON
    And numFound should be greater than 0
    And docs should be a non-empty array
    And the first 5 docs should have valid title and author

  Scenario: Validate search API with invalid term
    When I call search API with "asdkjfhaskjdhfkasjdhf"
    Then the response status should be 200
    And numFound should be zero or more
    And docs should be empty or valid