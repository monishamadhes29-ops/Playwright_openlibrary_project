Feature: Open Library UI Search Validation

  Scenario: Validate search results for a fixed term
    Given I navigate to Open Library homepage
    When I search for "The Hobbit"
    Then I should see a list of search results
    And at least 5 results should be visible
    And the first 5 results should have valid title and author