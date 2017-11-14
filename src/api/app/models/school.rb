class School < ApplicationRecord
   self.table_name = 'school'
   self.primary_key = 'state_lea_id'
   has_many :Exam, foreign_key: 'state_lea_id'
   has_one :Fiscal, foreign_key: 'state_lea_id'
   has_one :Fact, foreign_key: 'state_lea_id'
end
