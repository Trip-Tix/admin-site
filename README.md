# **Admin Site of TripTix**

Page where admininstrators can manage their services and see analytics

# Development Section

##### Naming Convention for Files

* For Pages use Kebab Case
* For Components use Snake Case
* For Public use Pascal Case
* For Api use Kebab Case (Similar to pages)

##### Folder Convention

* Pages folder should be informative and less redundant. (Ex. in admin/transport/bus/ don't use show-bus-list, use show-list)
* Component should reside in a folder named by the page it was used on. Folder name should have Camel Case
* For Components that are shared along varius page should reside in shared

##### Component Nesting

* To avoid speggeti code do not use more than 3 indentation when returning a component
* Do not add extra div. Add <></> component for wrapping up component for returning
* Avoid using Context as much as possible
* Each Page should reside inside a Layout Componet. Layout component carries information of metadata, page protection, titles, favicon
* When using shared data, Generate the data at the point where the components diverge from a single parent

##### String Variable Usage

* **NEVER** hard code any string in the code, always export the string from a public folder
* Export page urls from public/commonData/PageLinks.
