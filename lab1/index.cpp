#include <iostream>
#include <string>
#include <limits>
#include <vector>
#include <algorithm>  // For std::remove and std::remove_if
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

    //Function to display list of student
    void ListOfStudent(){
        if(numStudents == 0){ 
            cout << "Don't have any student in list." << endl;
            cout << "\n";
        }
        else
        {
        for(int i = 0; i < numStudents; i++){
            cout << i+1 << "." << students[i] << "." << endl;
        } 
        cout << "\n";
        cin.clear();
        }
    }

    // Function to remove a student from the list by name
    void removeStudent() {
        cout << "Enter the name of the student you want to remove from the list: ";
        string studentName;
        getline(cin, studentName);

        auto it = std::remove_if(students, students + numStudents, [&studentName](const std::string& student)
        {
            return student == studentName;
        }
        );

        if (it != students + numStudents) {
            numStudents = std::distance(students, it);
            std::cout << "Student '" << studentName << "' removed successfully.\n";
        } else {
            std::cout << "Student '" << studentName << "' not found in the list.\n";
        }
        cout << "\n";
        cin.clear();
}

    // Function to display the menu
    void displayMenu()
    {
        int choice;
        while (choice != 4)
        {
            choice = 0;
            cout << "1. Add a new student\n";
            cout << "2. List of students\n";
            cout << "3. Remove student from list by name\n";
            cout << "4. Quit\n";
            cout << "Enter your choice: ";
            cin >> choice;
            cin.ignore(numeric_limits<streamsize>::max(), '\n');
            switch (choice)
            {
            case 1:
                addStudent();
                break;
            case 2:
                ListOfStudent();
                break;
            case 3:
                removeStudent();
                break;
            case 4:
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