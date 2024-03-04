#include <iostream>
#include <iomanip>
#include <string>
#include <limits>
#include <algorithm>
#include <cstdlib>

using namespace std;

class Student
{
private:
    string names;
    float scores;

public:
    // Constructor
    Student(string names, float scores) : names(names), scores(scores) {}
    // Destructor
    ~Student() {}
    string getName()
    {
        return names;
    }
    float getScore()
    {
        return scores;
    }
};

class StudentManagement
{
private:
    Student **students;
    int numStudent;
    int maxStudent;

public:
    // Constructor
    StudentManagement(int maxSize) : numStudent(0), maxStudent(maxSize)
    {
        students = new Student *[maxStudent];
    }
    // Destructor
    ~StudentManagement()
    {
        for (int i = 0; i < numStudent; i++)
        {
            delete students[i];
        }
        delete[] students;
    }
    // Function to add a new student to the list
    void addStudent()
    {
        try
        {
            if (numStudent >= maxStudent)
            {
                cout << "Maximum number of students reached! " << endl;
                return;
            }
            cout << "Enter the name of the new student: ";
            string newName;
            getline(cin, newName);

            cout << "Enter the score of the new student: ";
            float newScore;
            cin >> newScore;
            cin.ignore(numeric_limits<streamsize>::max(), '\n');
            students[numStudent] = new Student(newName, newScore);
            numStudent++;
            cout << "Student added successfully!\n";
        }
        catch (const exception &e)
        {
            cout << "Cannot add student. Please try again!\n";
        }
    }

    // Function to display list of student and their scores
    void ListOfStudent()
    {
        if (numStudent == 0)
        {
            cout << "Don't have any students in list" << endl;
        }
        else
        {
            for (int i = 0; i < numStudent; i++)
            {
                cout << "Name: " << students[i]->getName() << ", Score: " << fixed << setprecision(1) << students[i]->getScore() << endl;
            }
        }
    }
    // Function display the student have the best score
    void printStudentHaveBestScore()
    {
        if (numStudent == 0)
        {
            cout << "Do not have any student in list!" << endl;
            return;
        }
        float highestScore = students[0]->getScore();
        for (int i = 1; i < numStudent; i++)
        {
            highestScore = max(highestScore, students[i]->getScore());
        }
        for (int i = 0; i < numStudent; i++)
        {
            if (students[i]->getScore() == highestScore)
            {
                cout << "Name: " << students[i]->getName() << ", Score: " << students[i]->getScore() << endl;
            }
        }
    }
    // Function to remove a student from the list by name
    void removeStudentByName()
    {
        if (numStudent == 0)
        {
            cout << "Do not have any student in list!" << endl;
            return;
        }
        cout << "Enter the name of the student you want to remove from the list: ";
        string nameToRemoved;
        getline(cin, nameToRemoved);
        for (int i = 0; i < numStudent; i++)
        {
            if (students[i]->getName() == nameToRemoved)
            {
                delete students[i];
            }
            for (int j = i; j < numStudent; j++)
            {
                students[j] = students[j + 1];
            }
            numStudent--;
            cout << "Student removed successfully!" << endl;
            return;
        }
        cout << "Student not found!" << endl;
    }

    // Function to display the menu
    void displayMenu()
    {
        int choice;
        while (choice != 5)
        {
            choice = 0;
            cout << "-------------------------------------------------" << endl;
            cout << "| 1. Add a new student" << setw(28) << "|\n";
            cout << "| 2. Display the list of all students' name" << setw(7) << "|\n";
            cout << "| 3. Remove student from list by name" << setw(13) << "|\n";
            cout << "| 4. Display students have the best score" << setw(9) << "|\n";
            cout << "| 5. Quit" << setw(41) << "|\n";
            cout << "-------------------------------------------------" << endl;
            cout << "Enter your choice: ";
            cin >> choice;
            cout << "-------------------------------------------------" << endl;
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
                removeStudentByName();
                break;
            case 4:
                printStudentHaveBestScore();
                break;
            case 5:
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
    int maxSize;
    cout << "Enter the maximum number of students: " << endl;
    cin >> maxSize;
    cin.ignore(numeric_limits<streamsize>::max(), '\n');
    StudentManagement studentManager(maxSize);

    studentManager.displayMenu();

    return 0;
}