#include <iostream>
#include <string>
#include <limits>
using namespace std;
const int MAX_STUDENTS = 100; // Maximum number of students

class StudentManagement
{
private:
    string students[MAX_STUDENTS]; // Array to store student names
    int numStudents;               // Variable to keep track of the number of students

public:
    // Constructor to initialize the number of students
    StudentManagement() : numStudents(0) {}

    // Function to add a new student to the list
    void addStudent()
    {
        if (numStudents < MAX_STUDENTS)
        {
            cout << "Enter the name of the new student: ";
            string newStudentName;
            getline(cin, newStudentName);

            students[numStudents] = newStudentName;
            numStudents++;

            cout << "Student added successfully!\n";

            // Clear the input buffer to consume any remaining characters
            cin.clear();
        }
        else
        {
            cout << "Maximum number of students reached. Cannot add more students.\n";
        }
    }

    // Function to display the menu
    void displayMenu()
    {
        int choice;
        while (choice != 2)
        {
            choice = 0;
            cout << "1. Add a new student\n";
            cout << "2. Quit\n";
            cout << "Enter your choice: ";
            cin >> choice;
            cin.ignore(numeric_limits<streamsize>::max(), '\n');
            switch (choice)
            {
            case 1:
                addStudent();
                break;
            case 2:
                cout << "Exiting program.\n";
                break;
            default:
                cout << "Invalid choice. Please enter a valid option.\n";
            }
        };
    }
};

int main()
{
    // Create an object of the StudentManagement class
    StudentManagement studentManager;

    // Display the menu and perform actions based on user input
    studentManager.displayMenu();

    return 0;
}
