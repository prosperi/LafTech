class School < ApplicationRecord
   self.table_name = 'school'
   self.primary_keys = :state_lea_id, :state_school_id
   has_many :Exam, :foreign_key => [:state_lea_id, :state_school_id]
   has_one :Fiscal, :foreign_key => [:state_lea_id, :state_school_id]
   has_one :Fact, :foreign_key => [:state_lea_id, :state_school_id]
   has_one :Performance, :foreign_key => [:state_lea_id, :state_school_id]
end
