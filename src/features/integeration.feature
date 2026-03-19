Feature: API to UI Consistency Validation

  Scenario: Verify API result title is present in UI results
    Given I fetch the first book title from search API using "The Hobbit"
    When I search for "The Hobbit" in UI
    Then I should see the API title in the UI results