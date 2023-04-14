## Formik Usage and Notes
Points about the Field component
1. by default, it renders input
2. It hooks up the field props to formik (handleblur,handleChange,value)
3. Takes in normal attributes as a normal input would
4. A different element other than input can be added as in "comments" field in Code using the "as" keyword
  - The as props can take several values including other component in other to decide what element to render if it isnt input
5. Render Props Pattern : gives more fine grained control over rendering of props field, used as in address in formik sample. It is mostly used when rendering custom form fields
  - Render props pattern uses a function as children to the component in opening and closing tags
  - console logging props (line 54) from the child function will expose 3 objects(field,form & meta) which can be further used to hook up formik
  - To hook the field with formik, we need to spread the Field props (this takes care of name,value,handleChange and handleBlur props).

## Grouping Values as Object
  To group data as object, depending as the Api demands (data : {...values}), first step
1. Create the said object in initial values (as we have socials on line 12)
2. Create corresponding field inputs
3. Set name attribute to the object values you wish to access