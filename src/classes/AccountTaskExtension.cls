public with sharing class AccountTaskExtension {

	private final Account acc;

  // The extension constructor initializes the private member
  // variable mysObject by using the getRecord method from the standard
  // controller.
  public AccountTaskExtension(ApexPages.StandardController stdController) {
    this.acc = (Account)stdController.getRecord();
  }

}