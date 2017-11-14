class Exam < ApplicationRecord
   self.table_name = 'data_exam'
   belongs_to :School, foreign_key: 'state_lea_id'

   def school_year
     "#{academic_year_start} - #{academic_year_end}"
   end

end
